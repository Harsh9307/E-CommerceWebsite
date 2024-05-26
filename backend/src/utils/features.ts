import mongoose from "mongoose"
import { InvalidateCacheProps } from "../types/types.js";
import { Product } from "../models/product.js";
import { myCache } from "../app.js";

export const connectDB = ()=>{
    mongoose.connect("mongodb://localhost:27017",{
        dbName:"Ecommerce24"
    }).then(c => console.log(`DB Connected to ${c.connection.host}`))
    .catch((e)=> console.log(e));
}

//The function's primary purpose is to ensure that cached data related to products is invalidated (deleted) when there are changes to the product data. This helps in maintaining data consistency between the cache and the database.
export const invalidateCahce = async ({
    product,
    order,
    admin,

}:InvalidateCacheProps)=> {
    if(product){
        const productKeys : string[]=[
            "latest-products",
            "categories",
            "all-products",
        ];
        const products = await  Product.find({}).select("_id");

        products.forEach((i)=>{
            productKeys.push(`product-${i._id}`);
        })

        myCache.del(productKeys);
    }
}