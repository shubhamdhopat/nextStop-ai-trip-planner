import React from "react";
import { Link } from "react-router-dom";

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
        {hotels.map((hotel, index) => {
          const name = hotel?.hotelName || hotel?.HotelName;
          const address = hotel?.hotelAddress || hotel?.HotelAddress;
          const price = hotel?.price || hotel?.PricePerNightINR;
          const rating = hotel?.rating || hotel?.Rating;

          return (
            <Link
              key={index}
              to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + "," + address)}`}
              target="_blank"
            >
              <div className="hover:scale-105 transition-all cursor-pointer">
                <img src="/placeholder.png" className="rounded-xl" />
                <div className="my-2 flex flex-col gap-2">
                  <h2 className="font-medium">{name}</h2>
                  <h2 className="text-xs text-gray-500">📍 {address}</h2>
                  <h2 className="text-sm">💰 {price}</h2>
                  <h2 className="text-sm">⭐ {rating} stars</h2>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Hotels;
