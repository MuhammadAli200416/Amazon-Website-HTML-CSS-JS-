export let order_cart;

export function loadOrderCart(){
    order_cart = JSON.parse(localStorage.getItem('order_cart') || [{
        
    }])
}
