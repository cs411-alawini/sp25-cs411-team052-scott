import express, { Request, Response } from 'express';

const app = express();
const PORT = 3007;

app.use(express.json());

app.get('/api/', (req: Request, res: Response) => {
    res.send('API of Flight Tracker');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});