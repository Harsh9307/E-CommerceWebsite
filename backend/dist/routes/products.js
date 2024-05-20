import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";
import { deleteProduct, getAdminProducts, getAllCategories, getAllProducts, getLatestProducts, getSingleProduct, newProduct, updateProduct } from "../controllers/product.js";
const app = express.Router();
//To Create New Product  - /api/v1/product/new
app.post("/new", adminOnly, singleUpload, newProduct);
// To get all products with fillters
app.get("/all", getAllProducts);
// To get last 10 product - /api/v1/product/latest
app.get("/latest", getLatestProducts);
// To get all categories - /api/v1/category
app.get("/categories", getAllCategories);
//to get all Products - /api/v1/admin-products
app.get("/admin-products", getAdminProducts);
// to get , update, delete product
app.route("/:id")
    .get(getSingleProduct)
    .put(adminOnly, singleUpload, updateProduct)
    .delete(adminOnly, deleteProduct);
export default app;
