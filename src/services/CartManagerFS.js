import fs from 'fs/promises';
import path from 'path';
import ProductManager from './ProductManagerFS.js';
import { v4 as uuidv4, v4 } from 'uuid';


const cartFilePath = path.resolve('data', 'cart.json');
const productManager = new ProductManager();

export default class CartManagerFS {

    constructor (){
        this.cart = [];
        this.init();
    }

    async init(){
        try{
            const data = await fs.readFile(cartFilePath, 'utf-8');
            this.cart = JSON.parse(data);

        }catch( err ){
            this.cart = [];
        }
    }

    saveToFile(){
        fs.writeFile(cartFilePath, JSON.stringify(this.cart, null, 2));
    }

    async readProducts(){
        return await fs.readFile(productsFilePath, 'utf-8');
    }

    createNewCart(){
        try{
            const newCart = {
                id : uuidv4(),
                products: []
            }

            this.cart.push(newCart);
            this.saveToFile();

            return newCart;

        }catch(err) {
            return null;
        }
    }

    showProductsById( id ){
        const index = this.cart.findIndex(c => c.id === id);

        if( index < 0 ){
            return null;
        }

        return this.cart[index].products; 
    }

    exists( id ){
        const index = this.cart.findIndex(c => c.id === id);

        if( index < 0){
            return null;
        }
        return index;
    }

    existsProduct( id ){
        const product = productManager.productById( id );
        return product;
    }

    addProduct( index, productID ){
        const product = this.existsProduct(productID);

        if( product == null ){
            return null;
        }
        

        const cartSelected = this.cart[index].products;
        

        let positionProduct = cartSelected.findIndex(cs => cs.product === product.id );
        

        if( positionProduct < 0 ){

            let newProduct = {
                product : product.id,
                quantity: 1   
            }

            cartSelected.push(newProduct);
            this.saveToFile();

            return newProduct;
        }

        

        cartSelected[positionProduct].quantity++;
        this.saveToFile();

        console.log(cartSelected[positionProduct]);
        

        return cartSelected[positionProduct];
    }
};