let basket = [];


function addToBasket(index) {
    console.log("Added:", index);
}

function renderDishes() {

    let categories = {
        "Burger & Sandwiches": ".contentDishesBurger",
        "Pizza": ".contentDishesPizza",
        "Pasta": ".contentDishesPasta",
        "Salad": ".contentDishesSalad"
    };

    Object.entries(categories).forEach(([category, selector]) => {

        let container = document.querySelector(selector);
        if (!container) return;

        container.innerHTML = "";

        let filteredDishes = myDishes.filter(dish => dish.category === category);
        

        filteredDishes.forEach((dish, index) => {
            container.innerHTML += `

            <div class="dish-card">
                    
                    <img src="${dish.image}" alt="${dish.name}">

                    <div class="dish-info">
                        <h3>${dish.name}</h3>
                        <p>${dish.description}</p>
                    </div>

                    <div class="dish-action">
                        <span class="price">${dish.price.toFixed(2)} €</span>
                            <button onclick="addToBasket(${dish.id})">
                                Add to Basket (${dish.amount})
                            </button>
                    </div>

                </div>
            `;
        });
    });
}


function addToBasket(id) {
    id = Number(id);

    let item = basket.find(d => d.id === id);

    if (item) {
        item.amount++;
    } else {
        let dish = myDishes.find(d => d.id === id);
        basket.push({ ...dish, amount: 1 });
    }

    renderBasket();
}


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


function init() {
    renderDishes();
}

