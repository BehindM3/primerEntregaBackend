const cartURL = 'http://localhost:8080/api/carts/';
const deleteBtnProduct = document.getElementById('deleteBtnProduct');

const handleClickDeleteProduct = async (event) => {
    event.preventDefault();

    const cartId = localStorage.getItem("cartId");
    const productId = deleteBtnProduct.dataset.productId;
    const deleteProductURL = `${cartURL}${cartId}/products/${productId}`;

    const deleteProduct = await fetch(deleteProductURL, {method: 'DELETE'}); 

    if(deleteProduct.ok){
        location.reload();
    }

}

deleteBtnProduct.addEventListener('click', handleClickDeleteProduct)