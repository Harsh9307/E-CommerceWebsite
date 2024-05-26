import express from 'express';
import { newUser,getAllUsers, getUser, deleteUser } from '../controllers/user.js';
import { adminOnly } from '../middlewares/auth.js';
import { allOrders, deleteOrder, getSingleOrder, myOrders, newOrder, processOrder } from '../controllers/order.js';

const app =express.Router();

// route - /api/v1/order/new
app.post("/new",newOrder);

// route - /api/v1/order/my
app.get("/my", myOrders);

// route - /api/v1/order/my
app.get("/all", adminOnly, allOrders);

app.get("/:id",getSingleOrder)
app.put("/:id",adminOnly,processOrder)
app.delete("/:id",adminOnly,deleteOrder);

export default app;