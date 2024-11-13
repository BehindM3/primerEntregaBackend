const btnAddProduct = document.getElementById("btn-addProduct");
const formAddProduct = document.getElementById("form-addProduct");
const productId = formAddProduct.dataset.productId;
let cartId = localStorage.getItem("cartId");

const handleClickAddProduct = async (event) =>{    
    event.preventDefault();

    if( !cartId ){
        const data = await fetch(cartURL, methodPost);
        const newCart = await data.json();
        const id = newCart.payload._id;
        localStorage.setItem("cartId", id);
    }

    cartId = localStorage.getItem("cartId");

    const addProductURL = `${cartURL}${cartId}/products/${productId}`;

    const addProduct = await fetch(addProductURL, { method: 'POST' });
}

btnAddProduct.addEventListener('click', handleClickAddProduct);