import { Router, Request, Response } from 'express';
import { getSavedFlights } from '../services/database';
import { Flight } from '../models/flight';

const router = Router();

router.get("/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);


    try {
        const saved: Flight[] = await getSavedFlights(id);
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

export default router;
