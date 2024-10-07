import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';


const productsFilePath = path.resolve('data', 'products.json');

export default class ProductManager {

    constructor () {
        this.products = [];
        this.init();
    }

    async init(){
        try{
            const data = await fs.readFile(productsFilePath, 'utf-8');
            this.products = JSON.parse(data);

        }catch( err ){
            this.products = [];
        }
    }

    saveToFile(){
        fs.writeFile(productsFilePath, JSON.stringify(this.products, null, 2));
    }

    getAllProducts(limit){
        if( limit ){
            return this.products.slice(0, limit);
        }
        return this.products;
    }

    productById( id ){
        const index = this.products.findIndex(p => p.id === id);
        
        if( index < 0 ){
            return null;
        }

        return this.products[index];
    }

    addProduct( product ){
        
        let newProduct = {
            ...product,
            status : true,
            id : uuidv4()
        }

        try{

            this.products.push(newProduct);
            this.saveToFile();
        }catch( err ){
            newProduct = null;
        }
        
        return newProduct;
    }

    updateProduct( id, updateData ){
        const index = this.products.findIndex( p => p.id === id);

        if( index < 0 ){
            return null;
        }

        this.products[index] = {
            ...this.products[index],
            ...updateData,
            id: this.products[index].id
        }

        this.saveToFile();

        return this.products[index];
    }

    deleteProduct( id ){
        const index = this.products.findIndex(p => p.id === id);

        if( index < 0 ){
            return null;
        }

        const productDeleted = this.products.splice(index, 1);
    
        this.saveToFile();
        
        return productDeleted;
    }
}