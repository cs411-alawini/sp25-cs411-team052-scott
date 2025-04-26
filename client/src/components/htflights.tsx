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
        <p className="text-center text-gray-600">No flights found.</p>
      ) : (
        flights.map((flight) => {
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
                <span className="font-semibold text-indigo-600">Origin Airport:</span>{" "}
                {flight.OriginAirportName} |{" "}
                <span className="font-semibold text-indigo-600">Visitor Count:</span>{" "}
                {flight.VisitorCount} 
              </p>
              {/* <div className="mt-2 flex justify-center items-center space-x-4">
                <button
                  className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                  onClick= {(event) => {
                    {onSave(flight.FlightID, quantity);};
                  }}
                >
                  Save Flight
                </button>
                <div className="flex items-center space-x-2">
    <label htmlFor={`quantity-${flight.FlightID}`} className="text-sm font-medium text-gray-700">
      Quantity:
    </label>
    <select
      id={`quantity-${flight.FlightID}`}
      className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
      defaultValue="1"
      onChange={(event) => {
      const newQuantity = parseInt(event.target.value);
      setQuantity(newQuantity);
      }}
    >
      {Array.from({ length: 10 }, (_, i) => (
        <option key={i + 1} value={i + 1}>
          {i + 1}
        </option>
      ))}
    </select>
  </div>
              </div> */}
            </div>
          );
        })
      )}
    </div>
  );
};


export default HTFlightList;
