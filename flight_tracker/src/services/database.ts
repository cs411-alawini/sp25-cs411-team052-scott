import { Flight } from '../models/flight';
import { Airport } from '../models/airport';
import { flightData, airportData } from '../../../data/mockData';
import pool from './connection';
import { RowDataPacket } from 'mysql2';

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
    const [rows] = await pool.query('SELECT * FROM Airport;');
    return rows as Airport[];
}

export async function getAirportByID(AirportID: number): Promise<Airport | undefined> {
    const sqlQuery = `SELECT * FROM Airport WHERE AirportID = ${AirportID};`; 
    const [rows] = await pool.query<RowDataPacket[]>(sqlQuery);
    return rows[0] as Airport;
}