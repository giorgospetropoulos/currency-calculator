import express from "express";
import { getUsers, createUser, authUser } from "../controllers/users.controller.js";

const router = express.Router();

// all routes here start with /users
router.get('/', getUsers);

router.post('/add', createUser);

router.post('/login', authUser);

export default router;