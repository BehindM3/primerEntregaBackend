import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import {__dirname} from './utils.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import socketHandler from './sockets/socket.js';


//Inicializamos el servidor HTTP y el de Sockets
const app = express();
const PORT = 8080;
const httpServer = app.listen( PORT, (req, res) => {
    console.log(`Server escuchando desde el puerto ${PORT}`);
    console.log(`http://localhost:${PORT}`);
})
const socketServer = new Server(httpServer);
const viewsURL = __dirname + '/views';
const publicURL = __dirname + '/public';


//Decalramos los middlewares para el manejo de objetos complejos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Configuracion del Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', viewsURL);
app.set('view engine', 'handlebars');


//Middleware para cargar los archivos estaticos desde /public
app.use(express.static( publicURL ));


//Inicializamos y conectamos con la DB
const pathDB = 'mongodb+srv://Userdb:2Ik27m5DKO0NMaSq@backendch.kbhal.mongodb.net/entregaFinal?retryWrites=true&w=majority&appName=BackendCH';

const connectMongoDB = async () => {

    try {
        await mongoose.connect(pathDB);
        console.log("Conectado a Mongo");
        
    } catch (error) {
        console.error("Error al conectar con Mongo: ", error );
        process.exit();

    }
}

connectMongoDB();


//Middlewares de los routers de la API 
app.use('/products', productsRouter);
app.use('/carts', cartsRouter);
app.use('/', viewsRouter);


//Escuchamos la conexion de un nuevo socket
app.set('socketServer', socketServer);


// Inicializar los sockets
socketHandler(socketServer);
