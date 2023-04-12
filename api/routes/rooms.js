import express from "express"
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from "../controllers/room.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createRoom)

//UPDATE
router.put("/:id", verifyAdmin, updateRoom)
router.put("/availability/:id", verifyUser, updateRoomAvailability)

//DELETE
router.delete("/:id", verifyAdmin, deleteRoom)

//GET
router.get("/:id", getRoom)

//GET ALL
router.get("/", getRooms)


export default router;