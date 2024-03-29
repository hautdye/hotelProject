import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import roomsRoute from "./routes/rooms.js"
import reservsRoute from "./routes/reservs.js"
import cookieParser from "cookie-parser"
const app = express()
dotenv.config()

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("connected to mongodb");
    }   catch(error){
        throw error;
    }
};

app.use(cookieParser())
app.use(express.json())

//app.use("/", (req, res) =>{ res.send("test")})
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/reservs", reservsRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

app.listen(8800, ()=>{
    mongoose.set("strictQuery", false);
    connect()
    console.log("Connected to backend")
})