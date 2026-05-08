let basket = [];
let basketOpened = false;

function addToBasket(id) {
    id = Number(id);

       if (!basketOpened) {
        document.querySelector(".basket_wrapper")?.classList.add("open");
        basketOpened = true;
    }

    let item = basket.find(d => d.id === id);
    let dish = myDishes.find(d => d.id === id);

    if (!dish) return;

    if (item) {
        item.amount++;
    } else {
        basket.push({ ...dish, amount: 1 });
    }

    let updatedItem = basket.find(d => d.id === id);
    dish.amount = updatedItem.amount;

    showBasket();
    renderBasket();
    renderDishes();
    updateBasketCount();
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

        filteredDishes.forEach((dish) => {
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

function removeFromBasket(id) {
    let item = basket.find(element => element.id === id);

    if (item) {
        item.amount--;

        if (item.amount <= 0) {
            basket = basket.filter(element => element.id !== id);
        }

        renderBasket();
        updateBasketCount();
    }
}

function init() {
    renderDishes();
    updateBasketCount();
}

function showBasket() {
    document.querySelector(".basket")?.classList.add("active");
}

function hideBasket() {
    document.querySelector(".basket")?.classList.remove("active");
}

function buyNow() {
    document.getElementById("orderDialog")?.classList.remove("hidden");

    document.getElementById("basket")?.classList.add("hidden");

    document.querySelector("#basket").innerHTML = "";

    setTimeout(() => {
        window.scrollTo(0, 0);
        location.reload();
    }, 5000);
}

function closeDialog() {
    document.getElementById("orderDialog")?.classList.add("hidden");
}

function scrollToBasket() {
    showBasket();
    renderBasket();

    document.querySelector(".basket")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

function getBasketAmount() {
    return basket.reduce((total, item) => total + item.amount, 0);
}

function updateBasketCount() {
    let totalAmount = getBasketAmount();

    let counter = document.getElementById("basketCount");
    if (counter) {
        counter.textContent = totalAmount;
    }
}
