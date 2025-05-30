import { Flight } from '../models/flight';
import { Airport } from '../models/airport';
import pool from './connection';
import { RowDataPacket } from 'mysql2';
import { User } from '../models/user';
import { SavedFlight } from '../models/savedflight';

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

export async function getPopularity(FlightID: number): Promise<Flight | undefined> {
    const sqlQuery = `CALL POPULAR (${FlightID});`;
    const [rows] = await pool.query<RowDataPacket[]>(sqlQuery);
    return rows[0] as Flight;
}

export async function getSavedFlights(UserID: number): Promise<SavedFlight[]> {
    const sqlQuery = `SELECT b.SavedFlightID, f.FlightID, dep.AirportName AS DepName, dest.AirportName AS DestName, f.FlightPrice, b.Quantity FROM Flight f 
    JOIN Airport dep ON f.Departure = dep.AirportID JOIN Airport dest ON f.Destination = dest.AirportID 
    NATURAL JOIN Booked_For NATURAL JOIN Booking b WHERE UserID = ${UserID} ORDER BY FlightPrice;`;
    const [rows] = await pool.query<RowDataPacket[]>(sqlQuery);
    return rows as SavedFlight[];
}


// Write SQL queries for CRUD operations, and create a trigger
// TODO
export async function saveFlight(UserID: number, FlightID: number, Quantity: number): Promise<{ success: boolean; message: string }> {
    const sqlQuery = `CALL SaveFlightByAirportCap(${UserID}, ${FlightID}, ${Quantity});`;
    try {
        await pool.query(sqlQuery);
        return { success: true, message: 'Flight saved successfully' };
    } catch (error: any) {
        console.error('Error saving flight:', error);
        const errorMessage = error.sqlMessage || 'An error occurred while saving the flight.';
        return { success: false, message: errorMessage }; // Rethrow the error to be handled by the caller
    }
    
}

// TODO
export async function deleteFlight(UserID: number, FlightID: number): Promise<void> {
    const sqlQuery = `DELETE FROM Booking WHERE (UserID = ${UserID} AND FlightID = ${FlightID});`;
    await pool.query(sqlQuery);
}

// TODO, figure out how to do this
export async function updateFlight(SavedID: number, Quantity: number): Promise<void> {
    const sqlQuery = `UPDATE Booking SET Quantity = ${Quantity} WHERE SavedFlightID = ${SavedID};`;
    await pool.query(sqlQuery);
}