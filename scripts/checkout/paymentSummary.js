import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";

export function renderPaymentSummary() {
    let paymentHTML = '';
    let cartItemQuantity = 0;
    let cartItemCost = 0;
    let shippingCost = 0;

    cart.forEach((cartItem) =>{
        const product = productPrice(cartItem.productID);
        cartItemQuantity += cartItem.quantity;
        cartItemCost += (product.priceCents * cartItem.quantity) / 100;
        shippingCost += deliveryCost(cartItem.deliveryOptionId);
    })

    const costBeforeTax = cartItemCost + shippingCost;
    const costAfterTax = costBeforeTax + (costBeforeTax * 0.1);

    paymentHTML = 
    `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (${cartItemQuantity}):</div>
            <div class="payment-summary-money">$${cartItemCost.toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${shippingCost.toFixed(2)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${costBeforeTax.toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(costBeforeTax * 0.1).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${costAfterTax.toFixed(2)}</div>
        </div>

        <button class="place-order-button button-primary">
            Place your order
        </button>
    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentHTML;
    document.querySelector('.js-checkout-items').innerHTML = `${cartItemQuantity} items`;
}


function deliveryCost(deliveryID) {
    let cost = 0;
    deliveryOptions.forEach((option) => {
        if(option.id === deliveryID){
            cost = option.priceCents / 100;
        }
    })

    return cost;
}

function productPrice(productID) {
    let matchProduct;
    products.forEach((product) => {
      if(product.id === productID){
        matchProduct = product;
      }
    });
    return matchProduct;
}