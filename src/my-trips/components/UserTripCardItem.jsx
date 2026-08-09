import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetPlacesDetails, PHOTO_REF_URL } from "@/service/GlobalApi";

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.destination?.name,
    };
    try {
      const resp = await GetPlacesDetails(data);
      const photoName = resp?.data?.places?.[0]?.photos?.[3]?.name;
      if (photoName) {
        const PhotoUrl = PHOTO_REF_URL.replace("{NAME}", photoName);
        setPhotoUrl(PhotoUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Link to={`/view-trip/${trip?.id}`}>
      <div className="hover:scale-105 transition-all cursor-pointer">
        <img
          src={photoUrl ? photoUrl : "/placeholder.png"}
          onError={(e) => {
            e.currentTarget.src = "/placeholder.png";
          }}
          className="object-cover rounded-xl h-[220px] w-full"
        />
        <div className="my-2">
          <h2 className="font-bold text-lg">
            {trip?.userSelection?.destination?.name}
          </h2>
          <h2 className="text-sm text-gray-500">
            📅 {trip?.userSelection?.noOfDays} Day | 💰{" "}
            {trip?.userSelection?.budget} Budget
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
