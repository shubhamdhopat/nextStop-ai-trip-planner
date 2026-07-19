import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  const itinerary = trip?.tripData?.itinerary || [];

  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>
      <div>
        {itinerary.map((item, index) => {
          const plan = item?.plan || item?.Plan || [];

          return (
            <div className="mt-5" key={index}>
              <h2 className="font-medium text-lg">Day {item.Day}</h2>
              <div className="grid md:grid-cols-2 gap-5">
                {plan.map((place, placeIndex) => (
                  <div className="my-3" key={placeIndex}>
                    <h2 className="font-medium text-sm text-orange-600">
                      {place?.BestTimeToVisit}
                    </h2>
                    <PlaceCardItem place={place} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlacesToVisit;
