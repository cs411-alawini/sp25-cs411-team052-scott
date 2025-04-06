import {Router, Request, Response} from 'express';
import {getNames} from '../services/database';
import {User} from '../models/user';

const router = Router();

router.get("/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    try {
        const user: User | undefined = await getNames(id);

        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({message: "DIE"});
        }

    } catch (error) {
        res.status(500).json({message: "HAHAHAHAHA"});
    }
});

export default router;