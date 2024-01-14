import { BaseResponse, Logger } from '@rifqioktario/ticketing-common';
import { Request, Response } from 'express';
import { from, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { Ticket } from '../models';
import { isEmpty } from 'lodash';
import TicketCreatedPublisher from '../events/publisher/TicketCreatedPub';
import { natsSvc } from '../server/event/NatsConfig';
import TicketUpdatedPublisher from '../events/publisher/TicketUpdatedPub';

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
                        userId: ticket.userId,
                    };
                }),
            )
            .subscribe({
                next: (ticket) => {
                    //prettier-ignore
                    Logger.info(`[${Namespace}, createTicket] Ticket created successfully: ${ticket.id}`);
                    Promise.resolve(
                        new TicketCreatedPublisher(natsSvc.client).publish({
                            id: ticket.id,
                            price: ticket.price,
                            title: ticket.title,
                            userId: ticket.userId,
                        }),
                    );

                    const response = {
                        id: ticket.id,
                        title: ticket.title,
                        price: ticket.price,
                    }

                    return res
                        .status(201)
                        .json(BaseResponse.successSaveResponse(response));
                },
                complete: () => {
                    Logger.info(
                        `[${Namespace}, createTicket] Event published successfully`,
                    );
                },
                error: (error) => {
                    //prettier-ignore
                    Logger.error(`[${Namespace}, createTicket] Error: ${error.message} | Stack: ${error.stack}`);
                    return res.boom.badImplementation();
                },
            });
    }

    static async getAllTickets(req: Request, res: Response) {
        from(Ticket.paginate()).subscribe({
            next: (tickets) => {
                //prettier-ignore
                Logger.info( `[${Namespace}, getAllTickets] Tickets found successfully`);
                return res.json(
                    BaseResponse.successResponse({
                        data: tickets,
                        message: 'Tickets Found',
                    }),
                );
            },
            error: (error) => {
                //prettier-ignore
                Logger.error(`[${Namespace}, getAllTickets] Error: ${error.message} | Stack: ${error.stack}`);
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
                // prettier-ignore
                Logger.info(`[${Namespace}, getTicket] Ticket found successfully: ${ticket.id}`);

                return res.json(
                    BaseResponse.successResponse({
                        data: ticket,
                        message: 'Ticket Found',
                    }),
                );
            },
            error: (error) => {
                //prettier-ignore
                Logger.error(`[${Namespace}, getTicket] Error: ${error.message} | Stack: ${error.stack}`);
                return res.boom.badImplementation();
            },
        });
    }

    static async updateTicket(req: Request, res: Response) {
        const { id } = req.params;
        const { id: userId } = req.currentUser!;
        const { title, price } = req.body;

        from(Ticket.findOne({ _id: id, userId }))
            .pipe(
                mergeMap((ticket) => {
                    if (!ticket) {
                        res.boom.badRequest('Ticket not found');
                        return of();
                    }
                    ticket.set({ title, price, userId: req.currentUser?.id! });
                    return ticket.save();
                }),
            )
            .subscribe({
                next: (ticket) => {
                    //prettier-ignore
                    Logger.info(`[${Namespace}, updateTicket] Ticket updated successfully`);
                    Logger.debug(`[${Namespace}, updateTicket] Data: ${ticket}`)

                    Promise.resolve(
                        new TicketUpdatedPublisher(natsSvc.client).publish({
                            id: ticket.id,
                            price: ticket.price,
                            title: ticket.title,
                            userId: ticket.userId,
                        }),
                    )
                    return res.json(
                        BaseResponse.successResponse({
                            data: ticket,
                            message: 'Ticket Updated',
                        }),
                    );
                },
                error: (error) => {
                    //prettier-ignore
                    Logger.error(`[${Namespace}, updateTicket] Error: ${error.message} | Stack: ${error.stack}`);
                    return res.boom.badImplementation();
                },
            });
    }
}
