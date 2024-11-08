import { Router } from "express";
import ProductManagerDB from "../services/ProductManagerDB.js";
//import ProductManagerFS from "../services/ProductManagerFS.js";


const router = Router();


/* const fsProductManager = new ProductManagerFS(); */
const dbProductManager = new ProductManagerDB();


/* function updateProductSocket (req) {
    const { emitProductsUpdated } = socketHandler(req.app.get('socketServer'));
    emitProductsUpdated();
} */

router.get('/', async (req, res) => {
    try{
        const products = await dbProductManager.getProducts(req.query);

        res.status(200).json(products);
    }catch( err ){
        console.log( "Error al intentar mostrar los productos: ", err.message );
        res.status(500).json({ status: "error", msg: "Error al intentar mostrar los productos"});
    }
});


router.get('/:pid', async (req, res) => {
    try {
        const {pid} = req.params; 

        const product = await dbProductManager.getProductsById(pid);
        
        if ( !product ){
            return res.status(404).json({ status: "error" , error: "Producto no encontrado"});
        }

        res.status(200).json( product );
    } catch (err) {
        console.log( "Error al intentar mostrar el producto: ", err.message );
        res.status(500).json({ status: "error", msg: "Error al intentar mostrar el producto"});
    }

});

router.post('/', async (req, res) => {

    try {
        const newProduct = await dbProductManager.create( req.body );

        if( !newProduct ){
            return res.status(400).json({ error: "Campos incompletos"});
        }

        //updateProductSocket(req);

        res.status(201).json({status: "success", msg : "Producto agregado correctamente.", newProduct})
    } catch (err) {
        console.log("Error al completar el registro del nuevo producto: ", err.message);
        res.status(500).json({ status: "error", error: "Error al completar el registro del nuevo producto." })
    }
});

router.put('/:pid', async(req, res) => {
    try {
        const { pid } = req.params;
        const productUpdate = req.body;
        const {updateProduct, matchedCount} = await dbProductManager.update( pid, productUpdate );
    
        if( !matchedCount ){
            return res.status(404).json({error: "El ID no corresponde a ningun producto existente."});
        }

        //updateProductSocket(req);
    
        res.status(202).json(updateProduct);
    } catch (err) {
        console.log("Error al actualizar el producto: ", err.message);
        res.status(500).json({ status: "error", error: "Error al actualizar el producto." })
    }
});


router.delete('/:pid', async(req, res) => {
    try {
        const { pid }= req.params;
        const {productDeleted, deletedCount} = await dbProductManager.delete( pid );

        if( !productDeleted || !deletedCount ){
            return res.status(404).json({ error: `No existe un producto de id: ${id}` });
        }

        //updateProductSocket(req);

        res.status(200).json({ msg: "Producto eliminado correctamente", productDeleted });

    } catch (err) {
        console.log( "Error al elimianr el producto: ", err.message );
        res.status(500).json({ status: "error", msg: "Error al eliminar el producto"});
    }
}); 

export default router;