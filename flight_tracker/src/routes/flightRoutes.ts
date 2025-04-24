import { Router, Request, Response } from 'express';
<<<<<<< Updated upstream
import { getAllFlights, getFlightByID, getFlightByAirport, getSavedFlights } from '../services/database';
=======
import { getAllFlights, getFlightByID, getFlightByAirport, getPopularity } from '../services/database';
>>>>>>> Stashed changes
import { Flight } from '../models/flight';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    if (!req.query.departure && !req.query.destination) {
        try {
            const allFlights: Flight[] = await getAllFlights();
            res.status(200).json(allFlights);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving flights', error });
        }
    } else {
        const departure = req.query.departure as string;
        const destination = req.query.destination as string;    
        try {
            const flight: Flight[] | undefined = await getFlightByAirport(Number(departure), Number(destination));
            res.status(200).json(flight);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving flight', error });
        }
    }
});


router.get("/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    
    try {
        const flight: Flight | undefined = await getFlightByID(id);
        
        if (flight) {
            res.status(200).json(flight);
        } else {
            res.status(404).json({ message: `Flight not found with ID ${id}` });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving flight', error });
    }
});

export default router;