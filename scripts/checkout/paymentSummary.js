import { cart , toFixedCost} from "../../data/cart.js";
import { findProduct } from "../../data/products.js";
import { getDeliveryCost } from "../../data/deliveryOptions.js";

export function renderPaymentSummary() {
    let paymentHTML = '';
    let cartItemQuantity = 0;
    let cartItemCost = 0;
    let shippingCost = 0;

    cart.forEach((cartItem) =>{
        const product = findProduct(cartItem.productID);
        cartItemQuantity += cartItem.quantity;
        cartItemCost += product.priceCents * cartItem.quantity;
        shippingCost += getDeliveryCost(cartItem.deliveryOptionId);
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
            <div class="payment-summary-money">$${toFixedCost(cartItemCost)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${toFixedCost(shippingCost)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${toFixedCost(costBeforeTax)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${toFixedCost(costBeforeTax * 0.1)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${toFixedCost(costAfterTax)}</div>
        </div>

        <a href="orders.html">
            <button class="place-order-button button-primary">
                Place your order 
            </button>
        </a>
    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentHTML;
    // document.querySelector('.js-checkout-items').innerHTML = `${cartItemQuantity} items`;
}