import { addToCart , cart , updateCartQuantity , saveCartToLocalStorage} from "../data/cart.js";
import { products, loadProducts } from "../data/products.js";

loadProducts(renderProductGrid);

function renderProductGrid(){
    let productsHTML = '';

    products.forEach((products) => {
        productsHTML += `
            <div class="product-container">
                <div class="product-image-container">
                    <img class="product-image"
                    src="${products.image}">
                </div>

                <div class="product-name limit-text-to-2-lines">
                    ${products.name}
                </div>

                <div class="product-rating-container">
                    <img class="product-rating-stars"
                    src="${products.getStarsUrl()}">
                    <div class="product-rating-count link-primary">
                    ${products.rating.count}
                    </div>
                </div>

                <div class="product-price">
                    ${products.getPrice()}
                </div>

                <div class="product-quantity-container">
                    <select>
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    </select>
                </div>

                <div class="product-spacer"></div>

                <div class="added-to-cart js-added-to-cart-${products.id}">
                    <img src="images/icons/checkmark.png">
                    Added
                </div>

                <button class="add-to-cart-button button-primary js-add-to-cart"
                data-product-id="${products.id}">
                    Add to Cart
                </button>
            </div>`
    })

    document.querySelector('.js-products-grid').innerHTML = productsHTML;

    document.querySelectorAll('.js-add-to-cart').forEach((button) => {
        button.addEventListener('click', () => {
            const productID = button.dataset.productId;

            addToCart(productID);
            updateCartQuantity();

            document.querySelector(`.js-added-to-cart-${productID}`).classList.add('js-added-to-cart');
            setTimeout(() => {
                document.querySelector(`.js-added-to-cart-${productID}`).classList.remove('js-added-to-cart');
            }, 2000);
        })
    })

    updateCartQuantity();
}

