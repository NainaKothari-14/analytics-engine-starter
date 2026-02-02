import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";
import analyticsRoutes from "./routes/analytics.routes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use("/api/analytics", analyticsRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.error("❌ DB error", err));
