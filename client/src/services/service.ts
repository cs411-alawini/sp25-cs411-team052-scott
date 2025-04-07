//import { flightData, airportData } from "./mockData";
import axios from "axios";

export interface Flight {
  FlightID: number;
  DepName: string;
  DestName: string;
  FlightPrice: number;
  TimeOfYear: number;
  CompanyID: number;
}

export interface Airport {
  AirportID: number;
  AirportName: string;
}

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3007";

export const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// export const searchAirportByCode = (code: string): Promise<Airport[]> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const filtered = airportData.filter(
//         (airport) => airport.AirportName.toUpperCase() === code.toUpperCase()
//       );
//       resolve(filtered);
//     }, 500); // Simulate a 500ms delay
//   });
// };

export const searchAirportByCode = (code: string): Promise<Airport> => {
  return httpClient
    .get(`/airports?search=${code}`)
    .then((response) => response.data);
};

// Search for flights by matching departure and destination airport IDs.
// export const searchFlightsByAirports = (
//   fromAirportID: number,
//   toAirportID: number
// ): Promise<Flight[]> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const filtered = flightData.filter(
//         (flight) =>
//           flight.Departure === fromAirportID &&
//           flight.Destination === toAirportID
//       );
//       resolve(filtered);
//     }, 500); // Simulate a 500ms delay
//   });
// };

export const searchFlightsByAirports = (
  fromAirportID: number,
  toAirportID: number
): Promise<Flight[]> => {
  return httpClient
    .get(`/flights?departure=${fromAirportID}&destination=${toAirportID}`)
    .then((response) => response.data);
};