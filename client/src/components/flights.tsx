// FlightList.tsx
import React from "react";
import { Flight } from '../services/service'
//import { Flight} from "../services/mockData"; // adjust the path if needed
// interface Flight {
//   FlightID: number;
//   Departure: string;
//   Destination: string;
//   FlightPrice: number;
// }

interface FlightListProps {
  flights: Flight[];
  onSave: (FlightID: number) => void;
}

const FlightList: React.FC<FlightListProps> = ({ flights, onSave }) => {
  return (
    <div className="space-y-4">
      {flights.length === 0 ? (
        <p className="text-center text-gray-600">No flights found.</p>
      ) : (
        flights.map((flight) => {
          return (
            <div
              key={flight.FlightID}
              className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white"
            >
              <p className="text-sm text-gray-900">
                <span className="font-semibold text-indigo-600">
                  Flight ID:
                </span>{" "}
                {flight.FlightID} |{" "}
                <span className="font-semibold text-indigo-600">From:</span>{" "}
                {flight.DepName} |{" "}
                <span className="font-semibold text-indigo-600">To:</span>{" "}
                {flight.DestName} |{" "}
                <span className="font-semibold text-indigo-600">Price:</span>{" "}
                ${flight.FlightPrice}
              </p>
              <div className="mt-2 flex justify-center">
                <button
                  className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                  onClick= {(event) => {
                    {onSave(flight.FlightID)};
                  }}
                >
                  Save Flight
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};


export default FlightList;
