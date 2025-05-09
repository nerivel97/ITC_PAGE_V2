import { Request, Response } from 'express';
import { IEvento, IEventoCreate, IEventoUpdate } from './event.interface';

export interface IEventoController {
  getAll(req: Request, res: Response): Promise<void>;
  getById(req: Request, res: Response): Promise<void>;
  create(req: Request, res: Response): Promise<void>;
  update(req: Request, res: Response): Promise<void>;
  delete(req: Request, res: Response): Promise<void>;
}