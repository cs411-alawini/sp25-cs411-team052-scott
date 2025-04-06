import express, { Request, Response } from 'express';
import airportRoutes from './src/routes/airportRoutes';
import flightRoutes from './src/routes/flightRoutes';
import userRoutes from './src/routes/userRoutes';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3007;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('API of Flight Tracker');
});

app.use('/airports', airportRoutes);
app.use('/flights', flightRoutes);
app.use('/users', userRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});