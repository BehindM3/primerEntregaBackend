import { Router } from "express";
import CartManager from "../services/CartManager.js";

const router = Router();
const cartManager = new CartManager();

router.post('/', (req, res) => {
    const newCart = cartManager.createNewCart();
    
    if( !newCart ){
        return res.status(500).json({ error: "Error interno del servidor al crear un nuevo carrito."})
    }

    res.status(200).json({ msg: "Carrito creado correctamente", newCart })
})

router.get('/:cid', (req, res) => {
    const id = req.params.cid;
    const cartProducts = cartManager.showProductsById( id );

    if( !cartProducts ){
        return res.status(404).json({ error: "Carrito no encontrado", msg: `No existe un carrito con id = ${id}`});
    }

    res.status(200).json(cartProducts);
});

router.post('/:cid/product/:pid', (req, res) => {
    const cartID = req.params.cid;
    const indexCart = cartManager.exists(cartID);
    

    if( indexCart == null ){
        return res.status(404).json({ error: `El carrito con id = ${cartID} no existe.`});
    }

    const productID = req.params.pid;
    const addedProduct = cartManager.addProduct(indexCart, productID);

    if( !addedProduct ){
        return res.status(404).json({ error: `No se encontro ningun producto con id = ${productID}`});
    }

    res.status(200).json(addedProduct);

});

export default router;