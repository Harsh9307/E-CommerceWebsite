import mongoose from "mongoose"
import { InvalidateCacheProps, OrderItemType } from "../types/types.js";
import { Product } from "../models/product.js";
import { myCache } from "../app.js";

export const connectDB = (uri:string)=>{
    mongoose.connect(uri,{
        dbName:"Ecommerce24"
    }).then(c => console.log(`DB Connected to ${c.connection.host}`))
    .catch((e)=> console.log(e));
}

//The function's primary purpose is to ensure that cached data related to products is invalidated (deleted) when there are changes to the product data. This helps in maintaining data consistency between the cache and the database.
export const invalidateCache = ({
    product,
    order,
    admin,
    userId,
    orderId,
    productId,
  }: InvalidateCacheProps) => {
    if (product) {
      const productKeys: string[] = [
        "latest-products",
        "categories",
        "all-products",
      ];
  
      if (typeof productId === "string") productKeys.push(`product-${productId}`);
  
      if (typeof productId === "object")
        productId.forEach((i) => productKeys.push(`product-${i}`));
  
      myCache.del(productKeys);
    }
    if (order) {
      const ordersKeys: string[] = [
        "all-orders",
        `my-orders-${userId}`,
        `order-${orderId}`,
      ];
  
      myCache.del(ordersKeys);
    }
    if (admin) {
      myCache.del([
        "admin-stats",
        "admin-pie-charts",
        "admin-bar-charts",
        "admin-line-charts",
      ]);
    }
  };
  

export const reduceStock = async (orderItems: OrderItemType[]) => {
    for (let i = 0; i < orderItems.length; i++) {
      const order = orderItems[i];
      const product = await Product.findById(order.productId);
      if (!product) throw new Error("Product Not Found");
      product.stock -= order.quantity;
      await product.save();
    }
  };