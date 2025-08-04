export const cart = [];

export function addToCart(productID){
    let productFound;

    cart.forEach((cartProduct) => {
        if(productID === cartProduct.productID){
            productFound = cartProduct;
        }
    })

    if(productFound){
        productFound.quantity += 1;
    }
    else{
        cart.push({
            productID: productID,
            quantity: 1
        })
    }
}

export function updateCartQuantity(){
    let cartQuantity = 0;
    cart.forEach((product) => {
        cartQuantity += product.quantity;
    });

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity
}