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