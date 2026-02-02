import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    price: Number,
    qty: Number,
  },
  { _id: false }
);

const transactionSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    items: {
      type: [itemSchema],
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["UPI", "Card", "Cash"],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Transaction = mongoose.model(
  "Transaction",
  transactionSchema
);
