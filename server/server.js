import express from "express";
import dotenv from "dotenv";
//Cross-Origin Resource Sharing.
//lets your backend talk safely to your frontend when they’re on different ports or domains.
import cors from "cors";
import connectDB from "./config/db.js";
import incomeRoutes from "./routes/incomeRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import authRoutes from "./routes/authRoutes.js";

//load environment variables from a file called .env into your app.
dotenv.config();
await connectDB();
const app = express();
// Enable CORS for all routes
app.use(cors());
// parse JSON body
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Spending Tracker API is running...");
});

app.use("/api/income", incomeRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
