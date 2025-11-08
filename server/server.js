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

const allowedOrigins = [
  "http://localhost:5173",
  "https://trackincomes.netlify.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

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

/*
Enable CORS for all routes

app.use(cors()); 
this is Equivalent to:
app.use(
  cors({
    origin: "*",
  })
);

This is the default / open configuration.
It allows any origin (any website) to make requests to your backend.
Any domain (even http://evil-site.com) can send requests.
No credentials (cookies, authorization headers) will be shared by default.

credentials: true, it allows cookies or Authorization headers to be sent and received.

const PORT = process.env.PORT || 5000;

✅ This is the correct way to handle both development and production.
When running locally, .env provides PORT=5000, so your app runs at localhost:5000.
When running on Render, it ignores your .env and uses the port Render assigns internally
*/
