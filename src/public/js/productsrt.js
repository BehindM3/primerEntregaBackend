const socket = io();

socket.on('productsUpdated', products => {
    const productList = document.getElementById('list-container');
    productList.innerHTML = '';

    products.forEach(product => {
        productList.innerHTML += `
            <article class="pr-container">
                <div class="pr-img">
                    <img src=${product.thumbnails[0]}  alt="Imagen representativa del producto: ${product.title}">
                </div>
                    
                <h3 class="pr-name">${product.title}</h3>
                <p>${product.description}</p>

                <button class="pr-price">${product.price} $</button>
                <span class="pr-stock">Stock: ${product.stock}</span>
            </article>
        `
    });
});