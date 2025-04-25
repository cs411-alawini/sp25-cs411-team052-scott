import { Router, Request, Response } from 'express';
import { getSavedFlights, saveFlight, deleteFlight, updateFlight } from '../services/database';
import { Flight } from '../models/flight';
import { SavedFlight } from '../models/savedflight';

const router = Router();

router.get("/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);


    try {
        const saved: SavedFlight[] = await getSavedFlights(id);
        if (saved) {
            res.status(200).json(saved);
        } else {
            res.status(404).json({ message: `No saved flights found for user with ID ${id}` });
        }

    } catch (error) {
        res.status(500).json({ message: 'Error retrieving saved flights', error });
    }
    
    
});

// Set up routes to send data from frontend to database for CRUD for saved flights

router.post("/post/", async (req: Request, res: Response) => {
    const { UserID, FlightID, Quantity } = req.body;

    try {
        const savedFlight = await saveFlight(UserID, FlightID, Quantity);
        res.status(201).json(savedFlight);
    } catch (error) {
        res.status(500).json({ message: 'Error saving flight', error });
    }
});

router.delete("/delete/", async (req: Request, res: Response) => {
    const { UserID, FlightID } = req.body;

    try {
        await deleteFlight(UserID, FlightID);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting flight', error });
    }
});

router.put("/update/", async (req: Request, res: Response) => {
    const { SavedFlightID, Quantity } = req.body;
    try {
        await updateFlight(SavedFlightID, Quantity);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: 'Error updating flight', error });
    }
});

export default router;
