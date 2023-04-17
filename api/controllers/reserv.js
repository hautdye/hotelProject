import Reserv from "../models/Reserv.js";


export const createReserv = async (req,res,next) =>{
    const tempReserv = new Reserv(req.body)
    const newReserv = Object.assign(tempReserv, {userId:req.params.id});
    try{
        const savedReserv = await newReserv.save()
        res.status(200).json(savedReserv)
    }catch(err){
        next(err)
    }
}

export const updateReserv = async (req,res,next)=>{
  try {
    const updatedReserv = await Reserv.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedReserv);
  } catch (err) {
    next(err);
  }
}

export const deleteReserv = async (req,res,next)=>{
  try {
    await Reserv.findByIdAndDelete(req.params.id);
    res.status(200).json("Reserv has been deleted.");
  } catch (err) {
    next(err);
  }
}

export const getUserReservs = async (req,res,next)=>{
  try {
    const reserv = await Reserv.find({userId: req.params.id});
    res.status(200).json(reserv);
  } catch (err) {
    next(err);
  }
}

export const getReservsUnavailableDates = async (req,res,next)=>{
  try {
    const reserv = await Reserv.find({roomNumberId: req.body.roomNumberId});
    let list =[];
    reserv.map((item)=>{list = list.concat(item.unavailableDates)});
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
}

export const getReservs = async (req,res,next)=>{
  try {
    const reservs = await Reserv.find();
    res.status(200).json(reservs);
  } catch (err) {
    next(err);
  }
}