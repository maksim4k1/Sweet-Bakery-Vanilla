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

function toggleClass(block, className){
    block.classList.toggle(className);
}

// Basket
const sweetsButtons = document.querySelectorAll(".sweets__button");
const basketItems = [];

sweetsButtons.forEach(item => {
    item.addEventListener("click", () => {
        const basketCount = document.querySelector(".header__basket-count");
        basketCount.textContent = Number(basketCount.textContent) + 1;

        const sweetItem = item.parentNode;
        const sweetName = sweetItem.childNodes[3].childNodes[1].textContent;
        const sweetPrice = sweetItem.childNodes[3].childNodes[5].textContent;
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
    });
});

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

function createElement(tag="div", className="", text=""){
    const block = document.createElement(tag);
    block.className = className;
    block.innerHTML = text;

    return block;
}