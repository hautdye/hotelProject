import mongoose from "mongoose";
const ReservSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    roomId:{
        type: String,
        required: true
    },
    roomNumberId:{
        type: String,
        required: true
    },
    unavailableDates: {
        type:[Date],
        validate: v => Array.isArray(v) && v.length > 0,
    }
},{timestamps:true});

export default mongoose.model("Reserv", ReservSchema)
