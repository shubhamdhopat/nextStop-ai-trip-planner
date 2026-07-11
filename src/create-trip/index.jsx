import React, { useState, useEffect, use } from "react";
import DestinationSearch from "./DestinationSearch.jsx";
import { Input } from "../components/ui/input.jsx";
import { AI_PROMPT, SelectBudgetOptions } from "@/constants/options.jsx";
import { SelectTravelesList } from "@/constants/options.jsx";
import { Button } from "../components/ui/button.jsx";
import { toast } from "sonner";
import { chatSession } from "../service/AIModel.jsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig.jsx";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function CreateTrip() {
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log("formData updated:", formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log("Login Failed:", error),
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (
      !formData?.destination ||
      !formData?.noOfDays ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast("Please fill all the fields");
      return;
    }

    if (formData?.noOfDays > 6 || formData?.noOfDays <= 0) {
      toast("Trip Days must be between 1 to 6 days");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.destination?.address,
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);
    // console.log("FINAL_PROMPT", FINAL_PROMPT);

    const result = await chatSession.sendMessage({ message: FINAL_PROMPT });

    console.log(result?.text);
    setLoading(false);
    SaveAiTrip(result?.text);
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
  };
  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          Headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        },
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp?.data));
        setOpenDialog(false);
        OnGenerateTrip();
      });
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🌴{" "}
      </h2>

      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is destination of choice?
          </h2>
          <DestinationSearch
            onSelect={(place) => handleInputChange("destination", place)}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder={"Ex. 3 "}
            type="number"
            className="h-12 text-base px-4"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
                  ${
                    formData?.budget === item.title
                      ? "shadow-lg border-black"
                      : ""
                  }`}
              >
                <h2 className="text-4xl ">{item.icon}</h2>
                <h2 className="text-lg font-bold">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan on traveling with on your next adventure?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelesList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveler", item.people)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
                  ${
                    formData?.traveler === item.people
                      ? "shadow-lg border-black"
                      : ""
                  }`}
              >
                <h2 className="text-4xl ">{item.icon}</h2>
                <h2 className="text-lg font-bold">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="my-10 justify-end flex text-base rounded-xl">
        <Button
          disabled={loading}
          onClick={OnGenerateTrip}
          className="px-7 py-5 text-base"
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin" h-7 w-7 />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <div className="flex items-center gap-1 mb-5">
                <img
                  src="/nextStop.png"
                  alt="NextStop Logo"
                  className="h-12 w-auto"
                />

                <h1 className="text-3xl font-extrabold tracking-tight">
                  <span className="text-[#0B1F4D]">next</span>
                  <span className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">
                    Stop
                  </span>
                </h1>
              </div>
              <h2 className="font-bold text-lg" mt-7>
                Sign In with Google
              </h2>
              <p>Sign in to your Google account to continue</p>
              <Button
                onClick={login}
                className="w-full mt-5  flex-gap-4 align-items-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
