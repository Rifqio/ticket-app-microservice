import { Router } from 'express';
import { TicketController } from '../controller/TicketController';
import { CreateTicketValidator, GetTicketValidator } from './validator/TicketRoutesValidator';
import { ValidationHandler } from '@rifqioktario/ticketing-common';

const route = Router();

route.post('/', CreateTicketValidator, ValidationHandler, TicketController.createTicket);
route.get('/:id', GetTicketValidator, ValidationHandler, TicketController.getTicket);

export default route;
