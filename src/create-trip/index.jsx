import React, { useState, useEffect } from "react";
import DestinationSearch from "./DestinationSearch.jsx";
import { Input } from "../components/ui/input.jsx";
import { AI_PROMPT, SelectBudgetOptions } from "@/constants/options.jsx";
import { SelectTravelesList } from "@/constants/options.jsx";
import { Button } from "../components/ui/button.jsx";
import { toast } from "sonner";
import { chatSession } from "../service/AIModel.jsx";

function CreateTrip() {
  const [formData, setFormData] = useState({});

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log("formData updated:", formData);
  }, [formData]);

  const OnGenerateTrip = async () => {
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

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.destination?.address,
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);
    console.log("FINAL_PROMPT", FINAL_PROMPT);

    const result = await chatSession.sendMessage({ message: FINAL_PROMPT });

    console.log(result?.text);
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
        <Button onClick={OnGenerateTrip} className="px-7 py-5 text-base">
          Generate Trip
        </Button>
      </div>
    </div>
  );
}

export default CreateTrip;
