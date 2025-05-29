import { Request, Response } from 'express';
import { HomeService } from '../services/home.service';

export class HomeController {
    static getHomeData(req: Request, res: Response) {
        const data = HomeService.getHomeData();
        res.status(200).json(data);
    }
}
