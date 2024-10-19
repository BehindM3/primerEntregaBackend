import { Router } from "express";
import ProductManager from "../services/ProductManager.js";
import socketHandler from "../sockets/socket.js"

const router = Router();
const productManager = new ProductManager();

function updateProductSocket (req) {
    const { emitProductsUpdated } = socketHandler(req.app.get('socketServer'));
    emitProductsUpdated();
}

router.get('/', (req, res) => {
    try{
        const limit = req.query.limits ? parseInt(req.query.limits) : undefined;
        const products = productManager.getAllProducts(limit);

        res.status(200).json(products);
    }catch( err ){
        console.log( err );
    }
});


router.get('/:pid', (req, res) => {

    const idRequest = req.params.pid; 

    const product = productManager.productById(idRequest);
    
    if ( !product ){

        return res.status(404).json({ error: "Producto no encontrado"});
    }

    res.status(200).json( product );
});

router.post('/', (req, res) => {
    
    const { title, description, code, price, stock, category, thumbnails } = req.body;

    if( !title || !description || !code || !price || !stock || !category ){

        return res.status(400).json({ error: "Campos incompletos"});
    }

    const newProduct = productManager.addProduct( { title, description, code, price, stock, category, thumbnails } );

    if( !newProduct ){
        return res.status(500).json({ error: "Error al completar el registro del nuevo producto." })
    }

    updateProductSocket(req);

    res.status(200).json({status: "success", msg : "Producto agregado correctamente.", newProduct})
});

router.put('/:pid', (req, res) => {

    const id = req.params.pid;
    const dataBody = req.body;
    const updateProduct = productManager.updateProduct( id, dataBody );

    if( !updateProduct ){
        return res.status(404).json({error: "El ID no corresponde a ningun producto existente."});
    }

    updateProductSocket(req);

    res.status(200).json(updateProduct);
});

router.delete('/:pid', (req, res) => {
    const id = req.params.pid;
    const productDeleted = productManager.deleteProduct( id );

    if( !productDeleted ){
        return res.status(404).json({ error: `No existe un producto de id: ${id}` });
    }

    updateProductSocket(req);

    res.status(200).json({ msg: "Producto eliminado correctamente", productDeleted });
});

export default router;