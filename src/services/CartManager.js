import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';


const cartFilePath = path.resolve('data', 'cart.json');

export default class CartManager {

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

    createNewCart(){
        const newCart = {
            
        }
    }

};