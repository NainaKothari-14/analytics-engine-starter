import mongoose from "mongoose";
import dotenv from "dotenv";
import { Transaction } from "../models/Transaction.model.js";

dotenv.config();

const cities = ["Mumbai", "Delhi", "Bangalore", "Pune"];
const paymentMethods = ["UPI", "Card", "Cash"];

const products = [
  { name: "Cold Coffee", category: "Beverages", price: 120 },
  { name: "Cappuccino", category: "Beverages", price: 150 },
  { name: "Sandwich", category: "Snacks", price: 140 },
  { name: "Burger", category: "Snacks", price: 180 },
  { name: "Pasta", category: "Meals", price: 220 },
];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateItems() {
  const count = Math.ceil(Math.random() * 3);
  return Array.from({ length: count }).map(() => {
    const product = randomItem(products);
    return {
      ...product,
      qty: Math.ceil(Math.random() * 3),
    };
  });
}

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Transaction.deleteMany();

    const transactions = [];

    for (let i = 0; i < 500; i++) {
      transactions.push({
        customerId: `U${Math.ceil(Math.random() * 80)}`,
        city: randomItem(cities),
        items: generateItems(),
        paymentMethod: randomItem(paymentMethods),
        createdAt: new Date(
          Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
        ),
      });
    }

    await Transaction.insertMany(transactions);

    console.log("✅ Database seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seedData();
