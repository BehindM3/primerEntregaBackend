import { Router } from "express";
import CartManager from "../services/CartManager";

const router = Router();
const cartManager = new CartManager();

router.post('/', (req, res) => {
    try{
        const newCart = cartManager.createNewCart();
        
        res.status(200).send({ msg: "Carrito creado correctamente", newCart })

    }catch( err ){
        console.log(err);
    }
})

export default router;