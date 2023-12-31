import { BaseResponse, Logger } from '@rifqioktario/ticketing-common';
import { Request, Response } from 'express';
import { from, map, switchMap, tap } from 'rxjs';
import { Ticket } from '../models';
import { isEmpty } from 'lodash';
import mongoose from 'mongoose';

const Namespace = 'TicketController';

export class TicketController {
    static async createTicket(req: Request, res: Response) {
        const { title, price } = req.body;

        const newTicket$ = new Ticket({
            title,
            price,
            userId: req.currentUser?.id!,
        });

        from(newTicket$.save())
            .pipe(
                map((ticket) => {
                    return {
                        id: ticket.id,
                        title: ticket.title,
                        price: ticket.price,
                    };
                }),
            )
            .subscribe({
                next: (ticket) => {
                    Logger.info(`[${Namespace}, createTicket] Ticket created successfully: ${ticket.id}`);
                    return res
                        .status(201)
                        .json(BaseResponse.successSaveResponse(ticket));
                },
                error: (error) => {
                    Logger.error(
                        `[${Namespace}, createTicket] Error: ${error.message} | Stack: ${error.stack}`,
                    );
                    return res.boom.badImplementation();
                },
            });
    }

    static async getTicket(req: Request, res: Response) {
        const { id } = req.params;
        
        from(Ticket.findById(id)).subscribe({
            next: (ticket) => {
                if (isEmpty(ticket)) {
                    Logger.info(`[${Namespace}, getTicket] Ticket not found`);
                    return res.boom.notFound('Ticket not found');
                }

                Logger.info(`[${Namespace}, getTicket] Ticket found successfully: ${ticket.id}`);
                return res.json(BaseResponse.successResponse({ data: ticket, message: 'Ticket Found' }));
            },
            error: (error) => {
                Logger.error(`[${Namespace}, getTicket] Error: ${error.message} | Stack: ${error.stack}`);
                return res.boom.badImplementation();
            },
        });
    }
}
