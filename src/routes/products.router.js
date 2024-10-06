import { Router } from "express";
import ProductManager from "../services/ProductManager.js";

const router = Router();
const productManager = new ProductManager();


router.get('/', (req, res) => {
    try{
        const limit = req.query.limits ? parseInt(req.query.limits) : undefined;
        const products = productManager.getAllProducts(limit);

        res.status(200).send(products);
    }catch( err ){
        console.log( err );
    }
});


router.get('/:pid', (req, res) => {

    const idRequest = req.params.pid; 

    const index = products.findIndex( p => p.id === idRequest );

    if ( index < 0 ){

        return res.status(404).send({ error: "Producto no encontrado"});
    }

    res.status(200).send( products[index] );
});

router.post('/', (req, res) => {
    const newProduct = req.body;


    /* 
        title:String,
        description:String
        code:String
        price:Number
        status:Boolean
        stock:Number
        category:String
        thumbnails:Array de Strings que contenga las rutas donde están almacenadas las imágenes referentes a dicho product

    */

});

export default router;