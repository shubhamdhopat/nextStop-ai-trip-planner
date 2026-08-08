import React from "react";
import { Link } from "react-router-dom";
import { GetPlacesDetails } from "@/service/GlobalApi";
import { useEffect } from "react";
import { useState } from "react";
import { PHOTO_REF_URL } from "@/service/GlobalApi";

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place?.placeName,
    };
    const result = await GetPlacesDetails(data).then((resp) => {
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[3].name,
      );
      // console.log(PhotoUrl);
      setPhotoUrl(PhotoUrl);
    });
  };
  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${place.placeName}`}
      target="_blank"
    >
      <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
        <img
          src={photoUrl || "/placeholder.png"}
          className="w-[130px] h-[130px] rounded-xl"
        />
        <div>
          <h2 className="font-bold text-lg">{place?.placeName}</h2>
          <p className="text-sm text-gray-400 flex-1">{place.placeDetails}</p>
          <h2 className="mt-2"> 🕘 {place?.timeToTravel} hour</h2>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
