const URL = "http://localhost:1717";

// Open / Close menu and basket
const openMenuButton = document.querySelector(".header__burger-button");
const closeMenuButton = document.querySelector(".header__burger-close-button");
const openBusketButton = document.querySelector(".header__basket-button");
const closeBusketButton = document.querySelector(".header__basket-close-button");

const headerMenu = document.querySelector(".header__navigation");
const headerBasket = document.querySelector(".header__content");

openMenuButton.addEventListener("click", () => {
    toggleClass(headerMenu, "open-menu");
    if(headerBasket.classList.contains("open-basket") === true){
        toggleClass(headerBasket, "open-basket");
    }
});
closeMenuButton.addEventListener("click", () => {
    toggleClass(headerMenu, "open-menu");
});
openBusketButton.addEventListener("click", () => {
    toggleClass(headerBasket, "open-basket");
    if(headerMenu.classList.contains("open-menu") === true){
        toggleClass(headerMenu, "open-menu");
    }
});
closeBusketButton.addEventListener("click", () => {
    toggleClass(headerBasket, "open-basket");
});

// Render pastryes list
const sweetsList = document.querySelector(".sweets__list");

async function renderSweets(){
    const data = getPastry();

    await data.then(data => data.forEach(element => {
        const item = createElement("li", "sweets__item");
        const image = createElement("img", "sweets__image");
        const info = createElement("div", "sweets__info");
        const name = createElement("div", "sweets__name", element.name);
        const ingredients = createElement("div", "sweets__ingredients", element.ingredients.join(", "));
        const price = createElement("div", "sweets__price", `$${element.cost}`);
        const button = createElement("button", "sweets__button", "Add to cart");

        item.setAttribute("id", element.id);
        image.setAttribute("src", element.image);
        if(element.inStock === 0){
            button.classList.add("sweets__button_disabled");
            button.setAttribute("disabled", "");
            button.textContent = "Not avaliable";
        }

        info.append(name, ingredients, price);
        item.append(image, info, button);

        sweetsList.append(item);
    }));

    setEventListeners();
}

function updateSweet(id){
    getPastry().then(data => data.forEach(element => {
        if(element.id === id && element.inStock <= 1){
            const item = document.getElementById(id);
            const button = item.childNodes[2]
            button.classList.add("sweets__button_disabled");
            button.setAttribute("disabled", "");
            button.textContent = "Not avaliable";
        }
    }));
}

// Basket
const basketItems = [];

function setEventListeners(){
    const sweetsButtons = document.querySelectorAll(".sweets__button");

    sweetsButtons.forEach(item => {
        item.addEventListener("click", async () => {
            const basketCount = document.querySelector(".header__basket-count");
            basketCount.textContent = Number(basketCount.textContent) + 1;

            const sweetItem = item.parentNode;
            const sweetName = sweetItem.childNodes[1].childNodes[0].textContent;
            const sweetPrice = sweetItem.childNodes[1].childNodes[2].textContent;
            const basketItem = basketItems.find(item => item.name === sweetName);

            if(basketItem === undefined){
                basketItems.push({
                    name: sweetName,
                    count: 1,
                    price: sweetPrice
                });
            } else{
                basketItem.count++;
            }

            renderBasket();
            updateSweet(sweetItem.getAttribute("id"));

            let inStock = 0;
            let body;
            await getPastry().then(data => {
                inStock = (data.find(item => item.id === sweetItem.getAttribute("id")).inStock) - 1;
                body = {"inStock": inStock};
            });

            console.log(inStock)

            fetch(`${URL}/pastry/update/${sweetItem.getAttribute("id")}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
        });
    });
}

const basketList = document.querySelector(".header__list");

function renderBasket(){
    const clearBusketText = document.querySelector(".header__clear-busket");
    clearBusketText.innerHTML = "";
    basketList.innerHTML = "";
    let totalPrice = 0;
    
    basketItems.forEach(element => {
        totalPrice += element.count * (Number(element.price.split("$")[1]));

        const item = createElement("li", "header__item");
        const info = createElement("div", "header__item-info");
        const name = createElement("p", "header__name", element.name);
        const count = createElement("p", "header__count", `${element.count} items`);
        const price = createElement("div", "header__price", element.price);

        info.append(name, count);
        item.append(info, price);

        basketList.append(item);
    });

    const line = createElement("hr", "header__line");
    const total = createElement("li", "header__total");
    const title = createElement("h6", "header__total-title", "Total:");
    const price = createElement("div", "header__total-ptice", `$ ${totalPrice.toFixed(2)}`);

    total.append(title, price);

    basketList.append(line, total);
}

// Functions
function toggleClass(block, className){
    block.classList.toggle(className);
}

function createElement(tag="div", className="", text=""){
    const block = document.createElement(tag);
    block.className = className;
    block.innerHTML = text;

    return block;
}

async function getPastry(){
    const response = await fetch(`${URL}/pastry`);
    const data = response.json();

    return data;
}

// Activate functions
renderSweets();