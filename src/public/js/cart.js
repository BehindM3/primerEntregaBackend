const cartURL = 'http://localhost:8080/api/carts/';
const cartBtn = document.getElementById('cartBtn');

const methodPost = {
    method: 'POST',
     headers: {
      'Content-Type': 'application/json'
    }
}

const handleClickCart = async (event) => {
    event.preventDefault();

    if( !cartId ){
        const data = await fetch(cartURL, methodPost);
        const newCart = await data.json();
        const id = newCart.payload._id;
        localStorage.setItem("cartId", id);
    }

    cartId = localStorage.getItem("cartId");
    
    location.assign(`http://${window.location.host}/cart/${cartId}`);
}

cartBtn.addEventListener('click', handleClickCart )