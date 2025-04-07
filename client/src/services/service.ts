import { flightData, airportData } from "./mockData";

export interface Flight {
  FlightID: number;
  Departure: number;
  Destination: number;
  FlightPrice: number;
  TimeOfYear: number;
  CompanyID: number;
}

export interface Airport {
  AirportID: number;
  AirportName: string;
}

export const searchAirportByCode = (code: string): Promise<Airport[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = airportData.filter(
        (airport) => airport.AirportName.toUpperCase() === code.toUpperCase()
      );
      resolve(filtered);
    }, 500); // Simulate a 500ms delay
  });
};

// Search for flights by matching departure and destination airport IDs.
export const searchFlightsByAirports = (
  fromAirportID: number,
  toAirportID: number
): Promise<Flight[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = flightData.filter(
        (flight) =>
          flight.Departure === fromAirportID &&
          flight.Destination === toAirportID
      );
      resolve(filtered);
    }, 500); // Simulate a 500ms delay
  });
};