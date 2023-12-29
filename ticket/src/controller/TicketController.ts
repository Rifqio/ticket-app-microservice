import { Logger } from '@rifqioktario/ticketing-common';
import { Request, Response } from 'express';
import { from, map, of, switchMap } from 'rxjs';
import { Ticket } from '../models';

const Namespace = 'TicketController';

export class TicketController {
    static async createTicket(req: Request, res: Response) {
        const { title, price } = req.body;

        const newTicket = new Ticket({
            title,
            price,
            userId: req.currentUser?.id!,
        });

        from(newTicket.save()).subscribe({
            next: (ticket) => {
                Logger.info(`[${Namespace}, createTicket] Ticket created successfully: ${ticket.id}`);
                return res.json({ data: ticket });
            },
            error: (error) => {
                Logger.error(`[${Namespace}, createTicket] Error: ${error.message}`);
                return res.boom.badRequest(error.message);
            },
        });
    }
}
