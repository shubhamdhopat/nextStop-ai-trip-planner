import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetPlacesDetails, PHOTO_REF_URL } from "@/service/GlobalApi";

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState("");

  // Extract everything here
  const name = hotel?.hotelName || hotel?.HotelName;
  const address = hotel?.hotelAddress || hotel?.HotelAddress;
  const price = hotel?.price || hotel?.PricePerNightINR;
  const rating = hotel?.rating || hotel?.Rating;

  useEffect(() => {
    if (name) {
      GetPlacePhoto();
    }
  }, [name]);

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: name,
      };

      const resp = await GetPlacesDetails(data);

      const photoName = resp?.data?.places?.[0]?.photos?.[3]?.name;

      if (photoName) {
        const url = PHOTO_REF_URL.replace("{NAME}", photoName);
        setPhotoUrl(url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${name}, ${address}`,
      )}`}
      target="_blank"
    >
      <div className="hover:scale-105 transition-all cursor-pointer">
        <img
          src={photoUrl || "/placeholder.png"}
          alt={name}
          className="rounded-xl h-[180px] w-full object-cover"
        />

        <div className="my-2 flex flex-col gap-2">
          <h2 className="font-medium">{name}</h2>
          <h2 className="text-xs text-gray-500">📍 {address}</h2>
          <h2 className="text-sm">💰 {price}</h2>
          <h2 className="text-sm">⭐ {rating} stars</h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;
