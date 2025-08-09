import { cart , saveCartToLocalStorage, toFixedCost } from "../../data/cart.js";
import { products } from "../../data/products.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderCart(){
  let cartHTML = '';

  cart.forEach((cartProduct, index) => {
    const productID = cartProduct.productID;

    let matchProduct;
    products.forEach((product) => {
      if(product.id === productID){
        matchProduct = product;
      }
    });

    const deliveryOptionId = cartProduct.deliveryOptionId;
    let deliveryOption;

    deliveryOptions.forEach((option) => {
      if(option.id === deliveryOptionId){
        deliveryOption = option;
      }
    })

    const today = dayjs();
    const deliverydate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliverydate.format('dddd, MMMM D');

    cartHTML += 
    `
      <div class="cart-item-container">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchProduct.name}
            </div>
            <div class="product-price">
              $${toFixedCost(matchProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartProduct.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-item" data-index="${index}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(productID, cartProduct)}
          </div>
        </div>
      </div>
    `;
  });

  document.querySelector('.js-order-summary').innerHTML = cartHTML;

  // 🗑️ Delete item listener
  document.querySelectorAll('.js-delete-item').forEach((deleteCartItem, index) => {
    deleteCartItem.addEventListener('click', () => {
      cart.splice(index, 1);
      saveCartToLocalStorage();
      renderCart();
      renderPaymentSummary();
    });
  });

  // ✅ New: delivery option radio input click listeners
  document.querySelectorAll('.delivery-option-input').forEach((radio) => {
    radio.addEventListener('click', () => {
      const productID = radio.dataset.productId;
      const selectedOptionID = radio.dataset.deliveryOptionId;

      const targetItem = cart.find(item => item.productID === productID);
      if (targetItem) {
        targetItem.deliveryOptionId = selectedOptionID;
      }

      saveCartToLocalStorage();
      renderCart();
      renderPaymentSummary();
    });
  });
}

function deliveryOptionsHTML(productID, cartProduct) {
  let deliveryHTML = '';

  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliverydate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliverydate.format('dddd, MMMM D');
    const price = deliveryOption.priceCents === 0 ? 'FREE' : `$${toFixedCost(deliveryOption.priceCents)} -`;
    const ischecked = deliveryOption.id === cartProduct.deliveryOptionId;

    deliveryHTML += `
      <div class="delivery-option">
        <input type="radio" 
          ${ischecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${productID}"
          data-product-id="${productID}"
          data-delivery-option-id="${deliveryOption.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${price} Shipping
          </div>
        </div>
      </div>
    `;
  })

  return deliveryHTML;
}
