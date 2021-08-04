// Open / Close menu
const openMenuButton = document.querySelector(".header__burger-button");
const closeMenuButton = document.querySelector(".header__burger-close-button");

const headerMenu = document.querySelector(".header__navigation");

openMenuButton.addEventListener("click", () => {
    toggleClass(headerMenu, "open-menu");
});
closeMenuButton.addEventListener("click", () => {
    toggleClass(headerMenu, "open-menu");
});

function toggleClass(block, className){
    block.classList.toggle(className);
}