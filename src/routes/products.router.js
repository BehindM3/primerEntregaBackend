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

    const product = productManager.productById(idRequest);
    
    if ( !product ){

        return res.status(404).send({ error: "Producto no encontrado"});
    }

    res.status(200).send( product );
});

router.post('/', (req, res) => {
    const { title, description, code, price, stock, category, thumbnails } = req.body;

    if( !title || !description || !code || !price || !stock || !category ){

        return res.status(400).send({ error: "Campos incompletos"});
    }

    const newProduct = productManager.addProduct( { title, description, code, price, stock, category, thumbnails } );

    if( !newProduct ){
        return res.status(500).send({ error: "Error al completar el registro del nuevo producto." })
    }

    res.status(200).send({status: "success", msg : "Producto agregado correctamente.", newProduct})
});

router.put('/:pid', (req, res) => {
    const id = req.params.pid;
    const dataBody = req.body;
    const updateProduct = productManager.updateProduct( id, dataBody );

    if( !updateProduct ){
        return res.status()
    }

});

export default router;