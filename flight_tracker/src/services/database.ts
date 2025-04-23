import { Flight } from '../models/flight';
import { Airport } from '../models/airport';
import pool from './connection';
import { RowDataPacket } from 'mysql2';
import { User } from '../models/user';

/**
 * Retrieves all flights from the database.
 * @returns A promise that resolves to an array of Flight objects.
 */
export async function getAllFlights(): Promise<Flight[]> {
    const [rows] = await pool.query(`SELECT f.FlightID, dep.AirportName AS DepName, dest.AirportName AS DestName, f.FlightPrice FROM Flight f 
    JOIN Airport dep ON f.Departure = dep.AirportID JOIN Airport dest ON f.Destination = dest.AirportID ORDER BY f.FlightPrice;`)
    return rows as Flight[];
}

/**
 * Retrieves a flight by its ID from the database.
 * @param FlightID - The ID of the flight to retrieve.
 * @returns A Promise that resolves to the Flight object if found, or undefined if not found.
 */
export async function getFlightByID(FlightID: number): Promise<Flight | undefined> {
    const sqlQuery = `SELECT f.FlightID, dep.AirportName AS DepName, dest.AirportName AS DestName, f.FlightPrice FROM Flight f 
    JOIN Airport dep ON f.Departure = dep.AirportID JOIN Airport dest ON f.Destination = dest.AirportID WHERE FlightID = ${FlightID} ORDER BY f.FlightPrice;`;
    const [rows] = await pool.query<RowDataPacket[]>(sqlQuery);
    return rows[0] as Flight;
}

/**
 * Retrieves flights from the database based on the departure and destination airports.
 * @param Departure - The ID of the departure airport.
 * @param Destination - The ID of the destination airport.
 * @returns A promise that resolves to an array of Flight objects.
 */
export async function getFlightByAirport(Departure: number, Destination: number): Promise<Flight[]> {
    const sqlQuery = `SELECT f.FlightID, dep.AirportName AS DepName, dest.AirportName AS DestName, f.FlightPrice FROM Flight f 
    JOIN Airport dep ON f.Departure = dep.AirportID JOIN Airport dest ON f.Destination = dest.AirportID 
    WHERE Departure = ${Departure} AND Destination = ${Destination} ORDER BY f.FlightPrice;`;
    const [rows] = await pool.query<RowDataPacket[]>(sqlQuery);
    return rows as Flight[];
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

export async function getAirportByName(AirportName: string): Promise<Airport | undefined> {
    const sqlQuery = `SELECT * FROM Airport WHERE AirportName = '${AirportName}';`;
    const [rows] = await pool.query<RowDataPacket[]>(sqlQuery);
    return rows[0] as Airport;
}


export async function getNames(UserID: number): Promise<User | undefined> {
    const sqlQuery = `SELECT * FROM Users WHERE UserID = ${UserID};`;
    const [rows] = await pool.query<RowDataPacket[]>(sqlQuery);
    return rows[0] as User;
}

// TODO: Implement the function to get saved flights
export async function getSavedFlights(UserID: number): Promise<Flight[]> {
    const sqlQuery = ``;
    const [rows] = await pool.query<RowDataPacket[]>(sqlQuery);
    return rows as Flight[];
}