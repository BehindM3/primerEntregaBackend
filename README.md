Programa que cuenta con: 
    
1) una API que administra los productos y el carrito de un comercio.
    
2) Dos (2) vistas web, que funcionanan con los protocolos **HTTP** y **Websockets** para mostrar los productos de la API:

     a) En la ruta principal "/", haciendo uso del protocolo HTTP.
     
     b) En la ruta "/realtimeproducts", para mostrar el funcionamiento de los websockets.
  
  Para el caso a) nos encontraremos con una lista de los productos cargados hasta ese momento, y cualquier tipo de modificacion sobre esa lista necesitara **REFRESCAR** la pagina.
  
  Mientras que en el caso b) nos vamos a encontrar con la misma lista de productos, pero esta sera sensible ante modificaciones en la lista original de "productos" por medio de llamados a la API, como con los metodos:

  
  ✍️ - **POST**, a traves de la ruta:
          
          "/api/products/"
  Se deja el siguiente ejemplo para el *body*:
        
        {
            "title": "Teclado Gamer Logitech G213",
            "description": "Teclado gamer, pensado para la comodidad del usuario gamer.",
            "code": "TCG-213",
            "price": 210,
            "stock": 70,
            "category": "Tecnologia Perifericos Gamer",
            "thumbnails": [
              "https://http2.mlstatic.com/D_NQ_NP_717345-MCO77978901653_072024-O.webp"
            ],
            "status": true
        }
        

  ⚒️ - **PUT**, a traves de la ruta:
          
          "/api/products/:pid"
  Se deja el siguiente ejemplo para el *body*:
        
        {
            "price": 100,
            "stock": 69
        }
        

  🚮 - **DELETE**, a traves de la ruta:
          
          "/api/products/:pid"

      

