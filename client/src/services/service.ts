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

export interface User {
  UserId: number;
  FirstName: string;
  LastName: string;
  AirportID: number;
}

export interface SavedFlight {
  FlightID: number;
  UserID: number;
  DepName: string;
  DestName: string;
  FlightPrice: number;
  TimeOfYear: number;
  Quantity: number;
  CompanyID: number;
}

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3007";

export const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const searchAirportByCode = (code: string): Promise<Airport> => {
  return httpClient
    .get(`/airports?search=${code}`)
    .then((response) => response.data);
};

export const searchFlightsByAirports = (
  fromAirportID: number,
  toAirportID: number
): Promise<Flight[]> => {
  return httpClient
    .get(`/flights?departure=${fromAirportID}&destination=${toAirportID}`)
    .then((response) => response.data);
};

export const getUserById = (userId: string): Promise<User> => {
  return httpClient
    .get(`/users/${userId}`)
    .then((response) => response.data);
};

export const getSavedFlights = (userId: string): Promise<SavedFlight[]> => {
  return httpClient
    .get(`/saved/${userId}`)
    .then((response) => response.data);
};

export const saveFlight = (UserID: number, FlightID: number): Promise<void> => {
  return httpClient
    .post(`/saved/post/`, { UserID, FlightID })
    .then((response) => response.data);
};


export const deleteFlight = (UserID: number, FlightID: number): Promise<void> => {
  return httpClient
    .delete(`/saved/delete/`, { data: { UserID, FlightID } })
    .then((response) => response.data);
};
