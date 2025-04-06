import { Flight } from '../models/flight';
import { Airport } from '../models/airport';
//import { flightData, airportData } from '../../../data/mockData';
import pool from './connection';
import { RowDataPacket } from 'mysql2';
import { User } from '../models/user';

//const fd: Flight[] = flightData;
//const ad: Airport[] = airportData;

export async function getAllFlights(): Promise<Flight[]> {
    const [rows] = await pool.query(`SELECT * FROM Flight;`)
    return rows as Flight[];
}

export async function getFlightByID(FlightID: number): Promise<Flight | undefined> {
    const sqlQuery = `SELECT * FROM Flight WHERE FlightID = ${FlightID};`;
    const [rows] = await pool.query<RowDataPacket[]>(sqlQuery);
    return rows[0] as Flight;
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


export async function getNames(UserID: number): Promise<User | undefined> {
    const sqlQuery = `SELECT * FROM Users WHERE UserID = ${UserID};`;
    const [rows] = await pool.query<RowDataPacket[]>(sqlQuery);
    return rows[0] as User;
}