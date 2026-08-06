import React from "react";
import HotelCardItem from "./HotelCardItem";

function Hotels({ trip }) {
  const tripDataRaw = trip?.tripData;
  const tripDataObj = Array.isArray(tripDataRaw) ? tripDataRaw[0] : tripDataRaw;

  const hotelsRaw = tripDataObj?.hotels;

  const hotels = Array.isArray(hotelsRaw)
    ? hotelsRaw
    : Object.values(hotelsRaw || {});

  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {hotels.map((hotel, index) => (
          <HotelCardItem key={index} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}

export default Hotels;
