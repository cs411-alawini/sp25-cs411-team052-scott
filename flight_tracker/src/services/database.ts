import { Flight } from '../models/flight';
import { Airport } from '../models/airport';
import { flightData, airportData } from '../../../data/mockData';

const fd: Flight[] = flightData;
const ad: Airport[] = airportData;

export async function getAllFlights(): Promise<Flight[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(fd);
        }, 300);
    });
}

export async function getFlightByID(FlightID: number): Promise<Flight | undefined> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const flight = fd.find(flight => flight.FlightID === FlightID);
            resolve(flight);
        }, 300);
    });
}


export async function getAllAirports(): Promise<Airport[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(ad);
        }, 300);
    });
}

export async function getAirportByID(AirportID: number): Promise<Airport | undefined> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const airport = ad.find(airport => airport.AirportID === AirportID);
            resolve(airport);
        }, 300);
    });
}