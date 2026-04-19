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
                    <h2>Your Basket</h2>
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

    renderBasket(); // 👈 DAS hat dir gefehlt
}


function renderBasket() {
    let container = document.querySelector(".basket");

    container.innerHTML = "";

    basket.forEach(item => {
        container.innerHTML += `
        <div class="basket-item">
            <span>${item.name}</span>
            <span>${item.amount}x</span>
            <span id "buy_botton">Buy now ${item.price}€</span>
        </div>
        `;
    });
}

function renderBasket() {
    let container = document.querySelector(".basket");

    let total = 0;

    container.innerHTML = "";

    basket.forEach(item => {
        total += item.price * item.amount;

        container.innerHTML += `
            <div class="basket-item">
                <span>${item.name}</span>
                <span>${item.amount} x ${item.price.toFixed(2)} €</span>
            </div>
        `;
    });

    container.innerHTML += `
    <hr>
    <button class="buy_button" onclick="buyNow()">
        Buy Now (${total.toFixed(2)} €)
    </button>
`;
}

function init() {
    renderDishes();
}

