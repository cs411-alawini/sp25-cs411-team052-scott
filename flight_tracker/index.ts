import express, { Request, Response } from 'express';
import airportRoutes from './src/routes/airportRoutes';
import flightRoutes from './src/routes/flightRoutes';
import userRoutes from './src/routes/userRoutes';
import savedRoutes from './src/routes/savedRoutes';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3007;

app.use(express.static(path.join(__dirname, '../client/build')));

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('API of Flight Tracker');
});

app.use('/airports', airportRoutes);
app.use('/flights', flightRoutes);
app.use('/users', userRoutes);
app.use('/saved', savedRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});