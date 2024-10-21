import mongoose, { Schema, Document } from "mongoose";
import { Ticket } from "@interfaces/ticketInterfaces";

export interface TicketDocument extends Ticket, Document {}

const ticketSchema: Schema<TicketDocument> = new Schema(
  {
    code: {
      type: String,
      unique: true,
      default: function () {
        return this._id
          ? this._id.toString()
          : new mongoose.Types.ObjectId().toString();
      },
    },
    purchase_datetime: {
      type: Date,
      default: Date.now,
    },
    amount: {
      type: Number,
      required: true,
    },
    purchaser: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

export default mongoose.model<TicketDocument>("Ticket", ticketSchema);
