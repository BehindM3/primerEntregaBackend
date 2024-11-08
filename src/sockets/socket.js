import ProductManager from "../services/ProductManagerFS.js";

const productManager = new ProductManager();

export default (io) => {

    io.on('connection', socket => {

        console.log("Nuevo usuario conectado.");

        socket.emit('productsUpdated', productManager.getAllProducts() );

    })

    const emitProductsUpdated = () => {
        io.emit('productsUpdated', productManager.getAllProducts())
    }

    return { emitProductsUpdated };
}