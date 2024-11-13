import { Router } from "express";
import CartManagerDB from "../services/CartManagerDB.js"
import { create } from "express-handlebars";
/* import CartManagerFS from "../services/CartManagerFS.js"; */

const router = Router();

const dbCartManager = new CartManagerDB();
/* const fsCartManager = new CartManagerFS(); */

router.post('/', async (req, res) => {
    try {
        const newCart = await dbCartManager.create();
        res.status(201).json({status: 201, msg: "Carrito creado correctamente", payload: newCart})

    } catch (err) {
        console.log("Error interno del servidor al crear un nuevo carrito", err.message );
        return res.status(500).json({ error: "Error interno del servidor al crear un nuevo carrito."})
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const {cid} = req.params;
        const cartProduct = await dbCartManager.getCartById(cid);  
        
        if( !cartProduct ){
            return res.status(404).json({ error: "Carrito no encontrado", msg: `No existe un carrito con id = ${cid}`, payload: null });
        }
        
        res.status(200).json(cartProduct);
    } catch (err) {
        console.log("Error interno del servidor, al querer recuperar el carrito de compra", err.message)
        res.status(500).json({error: "Error interno del servidor, al querer recuperar el carrito de compra."})
    }
});

router.post('/:cid/products/:pid', async(req, res) => {
    try {
        const {cid} = req.params;
        const cart = await dbCartManager.getCartById(cid);
        
        if( !cart ){
            return res.status(404).json({ error: `El carrito con id = ${cid} no existe.`});
        }

        const { pid } = req.params;
        const addedProduct = await dbCartManager.addProduct(pid, cid);

        if( !addedProduct ){
            return res.status(404).json({ error: `No se encontro ningun producto con id = ${pid}`});
        }

        res.status(200).json(addedProduct);

    } catch (err) {
        console.log("Error interno del servidor al agregar un producto al carrito: ", err.message );
        return res.status(500).json({ error: "Error interno del servidor al agregar un producto al carrito."})
    }
});

router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const {cid} = req.params;
        const cart = await dbCartManager.getCartById(cid);
        
        if( !cart ){
            return res.status(404).json({ error: `El carrito con id = ${cid} no existe.`});
        }

        const { pid } = req.params;
        const updateCart = await dbCartManager.deleteProductById(pid, cid);

        if( !updateCart ){
            return res.status(404).json({ error: `No se encontro ningun producto con id = ${pid}`});
        }

        res.status(204).json({msg: 'success', updateCart});

    } catch (err) {
        console.log("Error interno del servidor al eliminar un producto al carrito: ", err.message );
        return res.status(500).json({ error: "Error interno del servidor al eliminar un producto al carrito."});
    }
});

router.delete('/:cid', async (req, res) => {
    try {
        const {cid} = req.params;
        const updateCart = await dbCartManager.deleteAllProducts(cid);
        
        if( !updateCart ){
            return res.status(404).json({ error: `El carrito con id = ${cid} no existe.`});
        }

        res.status(204).json({ msg: 'success' });

    } catch (err) {
        console.log("Error interno del servidor al intentar eliminar todos los productos del carrito: ", err.message );
        return res.status(500).json({ error: "Error interno del servidor al intentar eliminar todos los productos del carrito."});
    }
});

router.put('/:cid/products/:pid', async (req, res) => {
    try {
        const {cid, pid} = req.params;
        const { cant } = req.body;

        if(cant <= 0){
            console.log("La cantidad ingresada no es valida.");
            return res.status(400).json({msg: "La cantidad ingresada no corresponde con un valor valido"})
        }

        const update = await dbCartManager.updateCantProducts(pid, cid, cant);
        
        if( !update ){
            console.log(`No existe ningun producto con id =  ${pid}`);
            return res.status(404).json({ error: `No existe ningun producto con id =  ${pid}`});    
        }

        res.status(202).json({msg: "Actualizado correctamente la nueva cantidad del producto indicado.", update})

    } catch (err) {
        console.log("Error interno del servidor al actualizar la cantidad de productos en el carrito: ", err.message );
        return res.status(500).json({ error: "Error interno del servidor al actualizar la cantidad de productos en el carrito."});
    }
});

router.put('/:cid', async (req, res) => {
    try {     
        const { cid } = req.params;
        const products = req.body;

        console.log(products)

        const cart = await dbCartManager.getCartById(cid);
               
        if( !cart ){
            return res.status(404).json({ error: `El carrito con id = ${cid} no existe.`});
        }

        const updateCart = await dbCartManager.addManyProducts(cid, products);

        if( !updateCart ){
            console.log("La peticion no cumple con los campos necesarios.");
            return res.status(400).json({error: "La peticion no cumple con los campos necesarios."});
        }

        res.status(200).json({msg: "Productos agregados correctamente.", payload: updateCart[0]})
    } catch (err) {
        console.log("Error interno del servidor al querer agregar los productos al carrito: ", err );
        return res.status(500).json({ error: "Error interno del servidor al querer agregar los productos al carrito."});
    }
})

export default router;