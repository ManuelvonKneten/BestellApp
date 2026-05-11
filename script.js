let basket = [];
let basketOpened = false;

function init() {
    renderDishes();
    updateBasketCount();
}

const toggleBasket = (open) => {
    document.querySelector(".basket_wrapper")?.classList.toggle("open", open);
    basketOpened = open;
};

const syncAmount = (id, amount) => {
    const dish = myDishes.find(d => d.id === id);
    if (dish) dish.amount = amount;
};

function addToBasket(id) {
    if (!basketOpened) toggleBasket(true);
    let item = basket.find(d => d.id === +id);
    if (item) {
        item.amount++;
    } else {
        item = { ...myDishes.find(d => d.id === +id), amount: 1 };
        basket.push(item);
    }
    syncAmount(+id, item.amount);
    updateUI();
}

function removeFromBasket(id) {
    let item = basket.find(d => d.id === +id);
    if (!item) return;

    if (--item.amount <= 0) {
        basket = basket.filter(d => d.id !== +id);
        syncAmount(+id, 0);
    } else {
        syncAmount(+id, item.amount);
    }

    if (!basket.length) toggleBasket(false);
    updateUI();
}

function updateUI() {
    showBasket();
    renderBasket();
    renderDishes();
    updateBasketCount();
}

function renderDishes() {
    for (const [category, selector] of Object.entries({
        "Burger & Sandwiches": ".contentDishesBurger",
        "Pizza": ".contentDishesPizza",
        "Pasta": ".contentDishesPasta",
        "Salad": ".contentDishesSalad"
    })) {
        document.querySelector(selector).innerHTML = myDishes
            .filter(dish => dish.category === category)
            .map(createDishCardTemplate)
            .join("");
    }
}

function renderBasket() {
    const items = document.querySelector("#basketItems");
    const summary = document.querySelector(".basket_summary");
    const deliveryCost = 3.99;

    if (!basket.length) return renderEmptyBasket(items, summary);

    const subtotal = calculateSubtotal(),
        total = subtotal + deliveryCost;

    items.innerHTML = basket.map(createBasketItemTemplate).join("");
    summary.innerHTML = createBasketSummaryTemplate(subtotal, deliveryCost, total);
}

function calculateSubtotal() {
    return basket.reduce((sum, item) => {
        return sum + item.price * item.amount;
    }, 0);
}

function renderEmptyBasket(
    basketItemsContainer,
    basketSummaryContainer
) {
    basketItemsContainer.innerHTML =
        createEmptyBasketTemplate();

    basketSummaryContainer.innerHTML =
        createEmptySummaryTemplate();
}

function getBasketAmount() {
    return basket.reduce((total, item) => {
        return total + item.amount;
    }, 0);
}

function updateBasketCount() {
    let totalAmount = getBasketAmount();

    let counter =
        document.getElementById("basketCount");

    if (!counter) return;

    counter.textContent = totalAmount;
    
}

function showBasket() {
    document
        .querySelector(".basket")
        ?.classList
        .add("active");
}

function hideBasket() {
    document
        .querySelector(".basket")
        ?.classList
        .remove("active");
}

function scrollToBasket() {
    showBasket();
    renderBasket();

    document
        .querySelector(".basket")
        ?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
}

function buyNow() {
    document.getElementById("orderDialog")?.classList.remove("hidden");
    document.querySelector(".basket")?.classList.add("hidden");

    basket = [];
    basketOpened = false;
    myDishes.forEach(d => d.amount = 0);

    updateUI();
    
    setTimeout(() =>
        document.getElementById("orderDialog")?.classList.add("hidden"),
        5000
    );
}

function closeDialog() {
    document
        .getElementById("orderDialog")
        ?.classList
        .add("hidden");
}

function calculateBasketTotals(subtotal, deliveryCost) {
    const total = subtotal + deliveryCost;

    return {
        subtotal,
        deliveryCost,
        total
    };
}

function renderBasketSummary(subtotal, deliveryCost) {
    const basketSummaryContainer = document.querySelector(".basket_summary");

    const { total } = calculateBasketTotals(subtotal, deliveryCost);

    basketSummaryContainer.innerHTML =
        createBasketSummaryTemplate(subtotal, deliveryCost, total);
}

function showDeleteIcon(item) {
    return item.amount <= 1;
}


