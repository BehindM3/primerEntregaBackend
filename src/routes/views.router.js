import { Router } from "express";

const router = Router();

router.get('/', async (req, res) => {
    try{
        const data = await fetch("http://localhost:8080/api/products");
        const dataJSON = await data.json();
        const products = dataJSON.payload;
        const cantCart = 1;

        res.render('home', {
            siteName: "Home - Products",
            styleSheetName: "style",
            products,
            cantCart
        });
        
    }catch(err){
        console.error('No pudieron cargarse los productos, error: ', err);
        res.render('404')
    }
    
});


router.get('/product/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const urlProductFetch = `http://localhost:8080/api/products/${pid}`;

        const data = await fetch(urlProductFetch);
        const dataJSON = await data.json();
        const product = dataJSON[0];

        console.log(product);
        
        res.render('productDetail', {
            siteName: product.title,
            styleSheetName: "style",
            product,
            cantCart: 0
        });
        
    } catch (error) {
        console.error('No pudo cargarse el producto, error: ', err);
        res.render('404')
    }
})

export default router;