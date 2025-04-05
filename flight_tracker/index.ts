import express, { Request, Response } from 'express';
import airportRoutes from './src/routes/airportRoutes';
import flightRoutes from './src/routes/flightRoutes';

const app = express();
const PORT = 3007;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('API of Flight Tracker');
});

app.use('/airports', airportRoutes);
app.use('/flights', flightRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});