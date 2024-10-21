import { Ticket } from "@interfaces/ticketInterfaces";
import TicketModel from "@models/ticketModel";

export class TicketService {
  async createTicket(ticketData: Ticket): Promise<Ticket> {
    const ticket = new TicketModel(ticketData);
    return ticket.save();
  }
}
