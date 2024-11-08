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

        return product;
    }

    async addProduct(pid, cid){

        const exist = await this.existProduct(pid)

        if( !exist ){
            return null;  
        }

        console.log(pid, this.existProduct(pid))

        let cart = await this.getCartById(cid);
        const index = cart.products.findIndex(p => String(p.product) === pid)
        
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
        
        if( !this.existProduct(pid) ){
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
        
        let rightProducts = await obj.products.forEach( async (p) => {
            const pid = p.product;
            const {cant} = p;
            
            let product = await this.addProduct(pid, cid);
        
            return product
        });

        console.log(rightProducts)

        return rightProducts;
       
    }
}