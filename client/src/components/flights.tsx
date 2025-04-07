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
}

const FlightList: React.FC<FlightListProps> = ({ flights }) => {
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
            </div>
          );
        })
      )}
    </div>
  );
};

// const FlightList: React.FC<FlightListProps> = ({ flights }) => {
//   return (
//     <div className="space-y-4">
//       {flights.length === 0 ? (
//         <p className="text-center text-gray-600">No flights found.</p>
//       ) : (
//         flights.map((flight) => {
//           // Look up the corresponding airport codes from airportData.
//           const departureAirport =
//             airportData.find(
//               (airport) => airport.AirportID === flight.Departure
//             )?.AirportName || flight.Departure;
//           const destinationAirport =
//             airportData.find(
//               (airport) => airport.AirportID === flight.Destination
//             )?.AirportName || flight.Destination;

//           return (
//             <div
//               key={flight.FlightID}
//               className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white"
//             >
//               <p className="text-sm text-gray-900">
//                 <span className="font-semibold text-indigo-600">
//                   Flight ID:
//                 </span>{" "}
//                 {flight.FlightID} |{" "}
//                 <span className="font-semibold text-indigo-600">From:</span>{" "}
//                 {departureAirport} |{" "}
//                 <span className="font-semibold text-indigo-600">To:</span>{" "}
//                 {destinationAirport} |{" "}
//                 <span className="font-semibold text-indigo-600">Price:</span>{" "}
//                 ${flight.FlightPrice}
//               </p>
//             </div>
//           );
//         })
//       )}
//     </div>
//   );
// };

export default FlightList;
