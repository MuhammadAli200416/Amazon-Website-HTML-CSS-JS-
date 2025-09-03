class Cart{
    cartItems = undefined;
    localStorageKey = undefined;

    constructor(localStorageKey) {
        this.loadFromStorage = localStorageKey;
        this.loadFromStorage();
    }

    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [{
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
    }

    saveCartToLocalStorage() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productID){
        let productFound;

        this.cartItems.forEach((cartProduct) => {
            if(productID === cartProduct.productID){
                productFound = cartProduct;
            }
        })

        if(productFound){
            productFound.quantity += 1;
        }
        else{
            this.cartItems.push({
                productID: productID,
                quantity: 1,
                deliveryOptionId: '1'
            })
        }

        this.saveCartToLocalStorage();
    }

    updateCartQuantity(){
        let cartQuantity = 0;
        this.cartItems.forEach((product) => {
            cartQuantity += product.quantity;
        });
        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    }

    toFixedCost(cost) {
        return (Math.round(cost) / 100).toFixed(2);
    }
}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);

console.log(businessCart instanceof Cart);