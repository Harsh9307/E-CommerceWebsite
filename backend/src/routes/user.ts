import express from 'express';
import { newUser,getAllUsers, getUser, deleteUser } from '../controllers/user.js';

const app =express.Router();

// route - /api/v1/user/new
app.post("/new",newUser);
app.get("/all",getAllUsers);
app.route("/:id").get(getUser).get(deleteUser);

export default app;