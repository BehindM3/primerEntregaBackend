import { Router } from "express";

const router = Router();

router.get('/', async (req, res) => {
    try{
        const productsURL = "http://localhost:8080/api/products";
        const data = await fetch(productsURL);
        const dataJSON = await data.json();
        const products = dataJSON.payload;


        res.render('home', {
            siteName: "Home - Products",
            styleSheetName: "style",
            products
        });
        
    }catch(err){
        console.error('No pudieron cargarse los productos, error: ', err);
        res.render('error', {
            styleSheetName: "error",
            numberError: "500: Internal Server Error"
        })
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
            styleSheetName: "productdetail",
            product
        });
        
    } catch (error) {
        console.error('No pudo cargarse el producto, error: ', error);
        res.render('error', { 
            styleSheetName: "error",
            numberError: "404: Product not found"
        });
    }
})

router.get('/cart/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cartURL = `http://localhost:8080/api/carts/${cid}`;
        
        const cartData = await fetch(cartURL);
        const cart = await cartData.json();

        let products = cart.products;

        console.log(products)

        res.render('cart', {
            siteName: "Cart",
            styleSheetName: "cart",
            products
        });

    }catch (error) {
        console.error('No pudo cargarse el carrito, error: ', error);
        res.render('error', { 
            styleSheetName: "error",
            numberError: "500: Internal Server Error"
        })
    }
})

export default router;