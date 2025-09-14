import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import todoRouter from "./routes/todoRoutes.js";
import cookieParser from "cookie-parser"
// import authRouter from "./server/routes/authRoutes.js";
// import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

app.use(express.json());
app.use(cors({ credentials: true }));
app.use(cookieParser())

app.get("/", (req, res) => res.send("API IS WORKING JUST FINE"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/todo", todoRouter);

app.listen(port, () => console.log(`Server connected on port: ${port}`));
