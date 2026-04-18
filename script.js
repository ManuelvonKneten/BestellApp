function addToBasket(index) {
    console.log("Added:", index);
}

function renderDishes() {
    let container = document.querySelector(".contentDishes");
    container.innerHTML = "";

    myDishes.forEach((dish, index) => {
        container.innerHTML += `
            <div class="dish-card">
                
                <!-- Bild links -->
                <img src="/assets/img/carbonara.jpg" alt="${dish.name}">

                <!-- Mitte -->
                <div class="dish-info">
                    <h3>${dish.name}</h3>
                    <p>${dish.description}</p>
                </div>

                <!-- Rechts -->
                <div class="dish-action">
                    <span class="price">${dish.price.toFixed(2)} €</span>
                    <button onclick="addToBasket(${index})">
                        + Add to Basket (${dish.amount})
                    </button>
                </div>

            </div>
        `;
    });
}

function init() {
    renderDishes();
}

