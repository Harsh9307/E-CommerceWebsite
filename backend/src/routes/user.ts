import express from 'express';
import { newUser,getAllUsers, getUser, deleteUser } from '../controllers/user.js';
import { adminOnly } from '../middlewares/auth.js';

const app =express.Router();

// route - /api/v1/user/new
app.post("/new",newUser);
app.get("/all",adminOnly,getAllUsers);
app.route("/:id").get(getUser).get(adminOnly,deleteUser);

export default app;