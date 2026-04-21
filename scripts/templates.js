
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
                <span>${item.name}</span>
                <span>${item.amount} x ${item.price.toFixed(2)} €</span>
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
