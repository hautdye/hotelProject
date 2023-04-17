import mongoose from "mongoose";
const RoomSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    subtitle:{
        type: String,
        required: true,
    },
    features:{
        type: String,
        required: true,
    },
    photos: {
        type: [String],
    },
    price:{
        type: Number,
        required: true,
    },
    maxPeople:{
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true,
    },
    ratingTitle:{
        type:String,
        required: true,
    },
    roomNumbers: [{number:Number, reservIds: {type:[String]} }],
    featured: {
        type: Boolean,
        default: false,
      },
},{timestamps:true});

export default mongoose.model("Room", RoomSchema)
