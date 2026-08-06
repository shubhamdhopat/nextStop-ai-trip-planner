import { Button } from "@/components/ui/button";
import React from "react";
import { IoIosSend } from "react-icons/io";
import { GetPlacesDetails } from "@/service/GlobalApi";
import { useEffect } from "react";
import { useState } from "react";
import { PHOTO_REF_URL } from "@/service/GlobalApi";

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.destination?.name,
    };
    const result = await GetPlacesDetails(data).then((resp) => {
      console.log(resp.data.places[0].photos[3].name);

      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[3].name,
      );
      console.log(PhotoUrl);
      setPhotoUrl(PhotoUrl);
    });
  };
  return (
    <div>
      <img
        src={photoUrl || "/placeholder.png"}
        alt="Trip Image"
        className="h-[340px] w-full object-cover rounded-xl"
      />

      <div className="flex justify-between items-center mt-5">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.destination?.name}
          </h2>
          <div className="hidden sm:flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg">
              📅 {trip?.userSelection?.noOfDays} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg">
              💰 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg">
              🥂 No. of Traveler : {trip?.userSelection?.traveler}
              {/* ? is for optional field if the value is not there will not get any error */}
            </h2>
          </div>
        </div>
        <Button>
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
