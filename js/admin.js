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

// Edit items

// Edit count
const addButtons = document.querySelectorAll(".add-sweets__button");
const removeButtons = document.querySelectorAll(".remove-sweets__button");

addButtons.forEach(element => {
    element.addEventListener("click", () => {
        const inStockValueBlock = element.parentNode.childNodes[3];
        inStockValueBlock.textContent = Number(inStockValueBlock.textContent) + 1;
    });
});
removeButtons.forEach(element => {
    element.addEventListener("click", () => {
        const inStockValueBlock = element.parentNode.childNodes[3];
        if(Number(inStockValueBlock.textContent) > 0){
            inStockValueBlock.textContent = Number(inStockValueBlock.textContent) - 1;
        }
    });
});

// Edit name
const editNameButtons = document.querySelectorAll(".edit-sweets-name__button");

editNameButtons.forEach(element => {
    element.addEventListener("click", () => {
        const nameValueBlock = element.parentNode.childNodes[1];
        if(nameValueBlock.childNodes[0].className === "edit-sweets__input"){
            let nameValue = nameValueBlock.childNodes[0].value;

            nameValueBlock.innerHTML = nameValue;
            element.innerHTML = `<img src="img/svg/edit.svg" alt="edit">`;
        } else{
            let nameValue = nameValueBlock.textContent;

            nameValueBlock.innerHTML = `<input type="text" class="edit-sweets__input" value="${nameValue}"/>`;
            element.innerHTML = `<img src="img/svg/save.svg" alt="save">`;
        }
    });
});

// Edit price
const editPriceButtons = document.querySelectorAll(".edit-sweets-price__button");

editPriceButtons.forEach(element => {
    element.addEventListener("click", () => {
        const priceValueBlock = element.parentNode.childNodes[3];
        if(priceValueBlock.childNodes[0].className === "edit-sweets__input edit-sweets__price-input"){
            let priceValue = priceValueBlock.childNodes[0].value;

            if(Number.isNaN(Number(priceValue)) === true){
                priceValueBlock.innerHTML = `$   0.01`;
            } else{
                priceValueBlock.innerHTML = `$   ${priceValue}`;
                element.innerHTML = `<img src="img/svg/edit.svg" alt="edit">`;
            }
        } else{
            let priceValue = Number(priceValueBlock.textContent.split("$")[1]);

            priceValueBlock.innerHTML = `<input type="text" class="edit-sweets__input edit-sweets__price-input" value="${priceValue}"/>`;
            element.innerHTML = `<img src="img/svg/save.svg" alt="save">`;
        }
    });
});