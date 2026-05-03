
function renderBasket() {
    let container = document.querySelector("#basketItems");
    let summary = document.querySelector(".basket_summary");

    let subtotal = 0;
    let delivery = 3.99;

    container.innerHTML = "";

    basket.forEach(item => {
        subtotal += item.price * item.amount;

        container.innerHTML += `
        <div class="basket-item">

            <div class="basket-top">
                <span>${item.amount} x ${item.name}</span>
            </div>

            <div class="basket-bottom">

                <div class="basket-actions">

                    <span style="cursor:pointer;"
                        onclick="${item.amount === 1 ? `removeFromBasket(${item.id})` : `removeFromBasket(${item.id})`}">

                        ${item.amount <= 1
                            ? `<img src="./assets/icons/delete.png" alt="delete" width="18" height="18">`
                            : `-`}
                    </span>

                    <span>
                        ${item.amount}x
                    </span>

                    <span onclick="addToBasket(${item.id})" style="cursor:pointer;">
                        +
                    </span>

                </div>

                <div class="basket-price">
                    ${item.price.toFixed(2)} €
                </div>

            </div>


        `;
    });

    let total = subtotal + delivery;

    summary.innerHTML = `
        <div class="basket-costs">
            <div class="line">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)} €</span>
            </div>

            <div class="line">
                <span>Delivery fee:</span>
                <span>${delivery.toFixed(2)} €</span>
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

function closeDialog() {
    document.getElementById("orderDialog").classList.add("hidden");
}
