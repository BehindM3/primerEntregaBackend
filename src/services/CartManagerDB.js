import { model } from "mongoose";
import { cartModel } from "../models/cart.model.js";
import ProductManagerDB from "./ProductManagerDB.js";

export default class CartManagerDB {
    async create(){
        const newCart = await cartModel.create({});
        return newCart;
    }

    async getCartById(cid){
        const cartSelected = cartModel.findById(cid).lean();
        return cartSelected;
    }

    async existProduct(pid){
        const dbProductManager = new ProductManagerDB();
        const product = await dbProductManager.getProductsById(pid);

        if( product.length === 0 ){
            return null;
        }

        return product;
    }

    async addProduct(pid, cid){

        const exist = await this.existProduct(pid)

        if( !exist ){
            return null;  
        }

        let cart = await this.getCartById(cid);
        const index = cart.products.findIndex(p => String(p.product._id) === pid)
        
        if( index < 0){
            cart.products.push({product: pid});
            await cartModel.updateOne({_id: cid}, cart);
    
            const update = this.getCartById(cid);

            return update;
        }

        cart.products[index].cant++;
        await cartModel.updateOne({_id: cid}, cart);

        const update = this.getCartById(cid);

        return  update;
    }

    async deleteProductById(pid, cid){
        
        const exist = await this.existProduct(pid)

        if( !exist ){
            return null;  
        }

        const update = await cartModel.updateOne({_id: cid}, {$pull: { products: {product: pid}}})
        
        return update;
    }

    async updateCantProducts(pid, cid, newCant){
        let cart = await this.getCartById(cid);
        const index = cart.products.findIndex(p => String(p.product._id) === pid)
        

        if( index < 0){
            return null;
        }

        cart.products[index].cant = newCant;
        await cartModel.updateOne({_id: cid}, cart);

        const update = this.getCartById(cid);

        return  update;
    }

    async deleteAllProducts(cid){
        let cart = await this.getCartById(cid);

        if( !cart ){
            return null;
        }

        cart = {
            ...cart,
            products: []
        }; 
        
        await cartModel.updateOne({_id: cid}, cart);
        
        return cart;
    }

    async addManyProducts( cid, obj){

        const rightProducts = await Promise.all(
            
            obj.products.map( async (p) => {
                const pid = p.product;
                const {cant} = p;
    
                console.log("\n 1- ",p, pid, cant)

                let product = await this.addProduct(pid, cid);
                
                console.log("\n 2- ", product)

                if( product ){
                    let updateProduct = await this.updateCantProducts(pid, cid, Number(cant));
                    console.log("\n 3- ", updateProduct)
                    return updateProduct;
                }
                
                return null;
            })
        
        );

        const filterProducts = rightProducts.filter(p => p !== null);

        if( filterProducts.length === 0 ){
            return null;
        }
        
        return filterProducts;
    }
}