function createDishCardTemplate(dish) {
    return `
        <div class="dish-card">

            <img
                src="${dish.image}"
                alt="${dish.name}"
            >

            <div class="dish-info">
                <h3>${dish.name}</h3>

                <p>${dish.description}</p>
            </div>

            <div class="dish-action">

                <span class="price">
                    ${dish.price.toFixed(2)} €
                </span>

                <button
                    onclick="addToBasket(${dish.id})"
                >
                    Add to Basket (${dish.amount})
                </button>

            </div>

        </div>
    `;
}

function createEmptyBasketTemplate() {
    return `
        <div class="basket-empty">

            <p>
                Nothing here yet.
                <br>
                Go ahead and choose something delicious!
            </p>

            <img
                src="./assets/icons/basket.svg"
                alt="basket"
            >

            <button class="basket-close-btn" onclick="hideBasket()">
                ×
            </button>

        </div>
    `;
}

function createEmptySummaryTemplate() {
    return `
        <div class="basket-costs">

            <div class="line">
                <span>Subtotal:</span>
                <span>0.00 €</span>
            </div>

            <div class="line">
                <span>Delivery fee:</span>
                <span>0.00 €</span>
            </div>

            <hr>

            <div class="line total">
                <strong>Total:</strong>
                <strong>0.00 €</strong>
            </div>

        </div>

        <button
            class="buy_button"
            disabled
        >
            Buy Now
        </button>
    `;
}

function createBasketItemTemplate(item) {
    return `
        <div class="basket-item">

            <div class="basket-top">
                <span>
                    ${item.amount} x ${item.name}
                </span>
            </div>

            <div class="basket-bottom">

                <div class="basket-actions">

                    <span
                        class="basket-action"
                        onclick="removeFromBasket(${item.id})"
                    >
                        ${getRemoveIconOrMinus(item)}
                    </span>

                    <span>
                        ${item.amount}x
                    </span>

                    <span
                        class="basket-action"
                        onclick="addToBasket(${item.id})"
                    >
                        +
                    </span>

                </div>

                <div class="basket-price">
                    ${item.price.toFixed(2)} €
                </div>

            </div>

        </div>
    `;
}

function getRemoveIconOrMinus(item) {
    return showDeleteIcon(item)
        ? `<img src="./assets/icons/delete.png" alt="delete" width="18" height="18">`
        : "-";
}

function createBasketSummaryTemplate(subtotal, deliveryCost, total) {
    return `
        <div class="basket-costs">

            <div class="line">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)} €</span>
            </div>

            <div class="line">
                <span>Delivery fee:</span>
                <span>${deliveryCost.toFixed(2)} €</span>
            </div>

            <hr>

            <div class="line total">
                <strong>Total:</strong>
                <strong>${total.toFixed(2)} €</strong>
            </div>

        </div>

        <button class="buy_button" onclick="buyNow()">
            Buy Now
        </button>
    `;
}