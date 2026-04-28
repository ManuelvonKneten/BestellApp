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
/* 
  Button in html einbauen
*/

function removeFromBasket(id) {
<<<<<<< HEAD
    let item = basket.find(element => element.id === id);
=======
    id = Number(id);
    let itemIndex = basket.findIndex(d => d.id === id);

    if (itemIndex !== -1) {
        let item = basket[itemIndex];
        
        if (item.amount > 1) {
            // Menge um eins verringern
            item.amount--;
        } else {
            // Wenn nur noch 1 übrig ist: ganz aus dem Array entfernen
            basket.splice(itemIndex, 1);
        }
    }

    renderBasket(); // Anzeige aktualisieren
}
>>>>>>> 4d16fe821fe077a80184b86e530cfab9412bf17f

    if (item) {
        item.amount--;

        if (item.amount <= 0) {
            basket = basket.filter(element => element.id !== id);
        }

        renderBasket();
    }
}

function init() {
    renderDishes();
}

