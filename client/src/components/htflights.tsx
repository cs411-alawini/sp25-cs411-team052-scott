// FlightList.tsx
import React from "react";
import { PopFlight } from '../services/service'

interface FlightListProps {
  flights: PopFlight[];
  onSave: (FlightID: number, Quantity: number) => void;
}

const HTFlightList: React.FC<FlightListProps> = ({ flights, onSave }) => {
//   const [quantity, setQuantity] = React.useState<number>(1);
  return (
    <div className="space-y-4">
      {flights.length === 0 ? (
        <p className="text-center text-gray-600">Not a high traffic airport.</p>
      ) : (
        <>
          <p className="text-center text-red-600 font-semibold">
            High traffic airport found. Incoming flights listed:
          </p>
          {flights.map((flight) => {
            return (
              <div
                key={flight.OriginAirportID}
                className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white"
              >
                <p className="text-sm text-gray-900">
                  <span className="font-semibold text-indigo-600">
                    Flight ID:
                  </span>{" "}
                  {flight.OriginAirportID} |{" "}
                  <span className="font-semibold text-indigo-600">
                    Origin Airport:
                  </span>{" "}
                  {flight.OriginAirportName} |{" "}
                  <span className="font-semibold text-indigo-600">
                    Visitor Count:
                  </span>{" "}
                  {flight.VisitorCount}
                </p>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default HTFlightList;
