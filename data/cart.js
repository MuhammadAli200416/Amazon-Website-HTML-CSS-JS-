export const cart = JSON.parse(localStorage.getItem('cart')) || [{
    productID: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    productName: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    productImage: "images/products/athletic-cotton-socks-6-pairs.jpg",
    productCost: 10.90,
    quantity: 2,
    deliveryOptionId: '1'
},{
    productID: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    productName: "Intermediate Size Basketball",
    productImage: "images/products/intermediate-composite-basketball.jpg",
    productCost: 20.95,
    quantity: 2,
    deliveryOptionId: '2'
}];

export function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

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
            quantity: 1,
            deliveryOptionId: '1'
        })
    }
}

export function updateCartQuantity(){
    let cartQuantity = 0;
    cart.forEach((product) => {
        cartQuantity += product.quantity;
    });
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}