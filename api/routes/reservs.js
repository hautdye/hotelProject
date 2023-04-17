import express from "express"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import { createReserv, deleteReserv, getReservs, getReservsUnavailableDates, getUserReservs, updateReserv } from "../controllers/reserv.js";

const router = express.Router();

//CREATE
router.post("/:id", verifyUser, createReserv)

//UPDATE
router.put("/:id", verifyUser, updateReserv);

//DELETE
router.delete("/:id", verifyUser, deleteReserv);

//GET USER RESERVS
router.get("/:id", verifyUser, getUserReservs);

//GET UNAVAILABLE DATES
router.post("/unavailable/:id", verifyUser, getReservsUnavailableDates);

//GET ALL
router.get("/", verifyAdmin, getReservs);

export default router;