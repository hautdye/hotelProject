import Room from "../models/room.js"
import {createError} from "../utils/error.js"

export const createRoom = async (req,res,next) =>{
    const newRoom = new Room(req.body)

    try{
        const savedRoom = await newRoom.save()
        res.status(200).json(savedRoom)
    }catch(err){
        next(err)
    }
}

export const updateRoom = async (req,res,next) =>{
    try{
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(updatedRoom)
    }catch(err){
        next(err)
    }
}

export const updateRoomAvailability = async (req,res,next) =>{
    try{
        if(req.body.delete){
            await Room.updateOne({"roomNumbers._id": req.body.roomNumberId},{
                $pull:{
                    "roomNumbers.$.reservIds": req.body.reservId
                }
            })
        }
        else{
            await Room.updateOne({"roomNumbers._id": req.body.roomNumberId},{
                $push:{
                    "roomNumbers.$.reservIds": req.body.reservId
                }
            })
        }
        res.status(200).json("Room status updated")
    }catch(err){
        next(err)
    }
}

export const deleteRoom = async (req,res,next) =>{
    try{
        await Room.findByIdAndDelete(req.params.id)
        res.status(200).json("Room has been deleted")
    }catch(err){
        next(err)
    }
}

export const getRoom = async (req,res,next) =>{
    try{
        const room = await Room.findById(req.params.id)
        res.status(200).json(room)
    }catch(err){
        next(err)
    }
}

export const getRooms = async (req,res,next) =>{
    const {min, max, limit, ...others} = req.query;
    try{
        const rooms = await Room.find({...others, price:{$gte: min | 1, $lte: max || 999999},}).limit(limit)
        res.status(200).json(rooms)
    }catch(err){
        next(err)
    }
}