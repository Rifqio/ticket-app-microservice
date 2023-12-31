import { Router } from 'express';
import { TicketController } from '../controller/TicketController';
import { CreateTicketValidator } from './validator/TicketRoutesValidator';
import { ValidationHandler } from '@rifqioktario/ticketing-common';

const route = Router();

route.post('/', CreateTicketValidator, ValidationHandler, TicketController.createTicket);

export default route;
