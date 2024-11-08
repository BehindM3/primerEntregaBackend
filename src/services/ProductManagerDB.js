import { productModel } from "../models/product.model.js";

export default class ProductManagerDB {

    async getProducts({limit, page, sort, query}){

        limit = Number(limit) || 10;
        page = Number(page) || 1;
        const filter = {};

        if( sort ) Number(sort);

        if( query ){
            const [clave, valor] = query.split(":");
            
            if( clave && valor ){
                filter[clave] = valor;
            }
        }

        let res = await productModel.paginate(filter, { limit, page, sort, lean: true});

        res.prevLink = res.hasPrevPage ? `http://localhost:8080/products?page=${res.prevPage}` : "";
        res.nextLink = res.hasNextPage ? `http://localhost:8080/products?page=${res.nextPage}` : "";

        res.status = "success";
        res.payload = res.docs;
        delete res.docs;

        return res;
    }
    
    async getProductsById( idProd ){
        const productSelected = await productModel.find({_id: idProd}).lean();

        return productSelected;
    }

    async create({ title, description, code, price, stock, category, thumbnails, status }){
        
        if( !title || !description || !code || !price || !stock || !category ){
            return null;
        }

        price = Number(price);
        stock = Number(price);

        console.log("Llegue aca");
        

        const newProduct = await productModel.create({ title, description, code, price, stock, category, thumbnails, status });

        return newProduct;
    }

    async delete( idProd ){
        const productDeleted = await productModel.findOne({ _id: idProd });

        if(Object.keys(productDeleted).length === 0){
            return null;
        }
        
        const {deletedCount} = await productModel.deleteOne({_id: idProd});

        return {productDeleted, deletedCount};
    }

    async update( idProd, productUpdated ){
        const {matchedCount} = await productModel.updateOne({_id: idProd}, productUpdated )
        const updateProduct = await this.getProductsById(idProd)
        return {updateProduct, matchedCount};
    }
}