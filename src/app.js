import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

const app = express();
const PORT = 8080;

//Decalramos los middlewares para el manejo de objetos complejos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


app.listen( PORT, (req, res) => {
    console.log(`Server escuchando desde el puerto ${PORT}`);
    console.log(`http://localhost:${PORT}`);

})