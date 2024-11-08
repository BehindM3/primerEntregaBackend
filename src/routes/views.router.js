import { Router } from "express";
import ProductManager from "../services/ProductManagerFS.js";

const router = Router();
const productManager = new ProductManager();


router.get('/', (req, res) => {
    const products = []
    
    try{
        const products = productManager.getAllProducts();

        res.render('home', {
            siteName: "Home - Products",
            styleSheetName: "style",
            products
        });
        
    }catch(err){
        console.error('No pudieron cargarse los productos, error: ', err);
    }
    
});

router.get('/realtimeproducts', (req, res) => {
    const products = []
    
    try{
        const products = productManager.getAllProducts();

        res.render('realtimeproducts', {
            siteName: "Real Time Products",
            styleSheetName: "style",
            products
        });
        
    }catch(err){
        console.error('No pudieron cargarse los productos, error: ', err);
    }
});

export default router;