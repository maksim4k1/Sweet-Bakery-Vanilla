const URL = "http://localhost:1717";

// Open / Close menu
const headerMenu = document.querySelector(".header__navigation");
const openMenuButton = document.querySelector(".header__burger-button");
const closeMenuButton = document.querySelector(".header__burger-close-button");

openMenuButton.addEventListener("click", () => {
    toggleClass(headerMenu, "open-menu");
});
closeMenuButton.addEventListener("click", () => {
    toggleClass(headerMenu, "open-menu");
});

// Render items
function renderItem(){
    const editSweetsList = document.querySelector(".edit-sweets__list");
    editSweetsList.innerHTML = "";
    const data = getData();

    data.then(data => data.forEach(element => {
        const item = createElement("li", "edit-sweets__item");
        const name = createElement("div", "edit-sweets__content edit-sweets__name");
        const nameValue = createElement("div", "edit-sweets__name-value edit-sweets__value", element.name);
        const nameButton = createElement("button", "edit-sweets__button edit-sweets-name__button", `<img src="img/svg/edit.svg" alt="edit">`);
        const price = createElement("div", "edit-sweets__content edit-sweets__price");
        const priceText = createElement("div", "edit-sweets__text", "price:");
        const priceValue = createElement("div", "edit-sweets__price-value edit-sweets__value", `$   ${element.cost}`);
        const priceButton = createElement("button", "edit-sweets__button edit-sweets-price__button", `<img src="img/svg/edit.svg" alt="edit">`);
        const inStock = createElement("div", "edit-sweets__content edit-sweets__inStock");
        const inStockText = createElement("div", "edit-sweets__text", "in stock:");
        const inStockButtons = createElement("button", "edit-sweets__buttons");
        const inStockAddButton = createElement("button", "edit-sweets__button add-sweets__button", `<img src="img/svg/plus.svg" alt="add">`);
        const inStockValue = createElement("div", "edit-sweets__inStock-value edit-sweets__value", element.inStock);
        const inStockRemoveButton = createElement("button", "edit-sweets__button remove-sweets__button", `<img src="img/svg/minus.svg" alt="remove">`);
        const deleteButton = createElement("button", "edit-sweets__button delete-sweets__button", `<img src="img/svg/delete.svg" alt="delete">`);

        name.append(nameValue, nameButton);
        price.append(inStockText, priceValue, priceButton);
        inStockButtons.append(inStockAddButton, inStockValue, inStockRemoveButton);
        inStock.append(priceText, inStockButtons);
        item.append(name, price, inStock, deleteButton);
        item.setAttribute("id", element.id);

        editSweetsList.append(item);
    })).then(() => addEventListeners());
}

// Edit/delete items
function addEventListeners(){
    // Edit count
    const addButtons = document.querySelectorAll(".add-sweets__button");
    const removeButtons = document.querySelectorAll(".remove-sweets__button");

    addButtons.forEach(element => {
        element.addEventListener("click", () => {
            const id = element.parentNode.parentNode.parentNode.getAttribute("id");
            const inStockValueBlock = element.parentNode.childNodes[1];
            inStockValueBlock.textContent = Number(inStockValueBlock.textContent) + 1;
            updateData({
                inStock: Number(inStockValueBlock.textContent)
            }, id);
        });
    });
    removeButtons.forEach(element => {
        element.addEventListener("click", () => {
            const id = element.parentNode.parentNode.parentNode.getAttribute("id");
            const inStockValueBlock = element.parentNode.childNodes[1];
            if(Number(inStockValueBlock.textContent) > 0){
                inStockValueBlock.textContent = Number(inStockValueBlock.textContent) - 1;
                updateData({
                    inStock: Number(inStockValueBlock.textContent)
                }, id);
            }
        });
    });

    // Edit name
    const editNameButtons = document.querySelectorAll(".edit-sweets-name__button");

    editNameButtons.forEach(element => {
        element.addEventListener("click", () => {
            const id = element.parentNode.parentNode.getAttribute("id");
            const nameValueBlock = element.parentNode.childNodes[0];
            if(nameValueBlock.childNodes[0].className === "edit-sweets__input"){
                let nameValue = nameValueBlock.childNodes[0].value;

                nameValueBlock.innerHTML = nameValue;
                element.innerHTML = `<img src="img/svg/edit.svg" alt="edit">`;

                updateData({
                    name: nameValue
                }, id);
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
            const id = element.parentNode.parentNode.getAttribute("id");
            const priceValueBlock = element.parentNode.childNodes[1];
            if(priceValueBlock.childNodes[0].className === "edit-sweets__input edit-sweets__price-input"){
                let priceValue = priceValueBlock.childNodes[0].value;

                if(Number.isNaN(Number(priceValue)) === true || Number(priceValue) === 0){
                    priceValueBlock.innerHTML = `$   0.01`;
                } else{
                    priceValueBlock.innerHTML = `$   ${priceValue}`;
                    element.innerHTML = `<img src="img/svg/edit.svg" alt="edit">`;
                }
                updateData({
                    cost: Number(priceValueBlock.textContent.split("$")[1])
                }, id);
            } else{
                let priceValue = Number(priceValueBlock.textContent.split("$")[1]);

                priceValueBlock.innerHTML = `<input type="text" class="edit-sweets__input edit-sweets__price-input" value="${priceValue}"/>`;
                element.innerHTML = `<img src="img/svg/save.svg" alt="save">`;
            }
        });
    });

    // Delete item
    const deleteButtons = document.querySelectorAll(".delete-sweets__button");

    deleteButtons.forEach(element => {
        element.addEventListener("click", () => {
            const id = element.parentNode.getAttribute("id");

            const isDelete = confirm("\n???? ?????????????? ?????? ???????????? ?????????????? ???????? ?????????????? ???? ???????????? ???????????????\n???????? ???? ?????????????? ???????? ?????????? ???? ???????????? ???? ?????????????? ?????? ????????????????????????!");
            if(isDelete === true){
                deleteData(id);
            }
        });
    })
}

// Add item
function addItem(){
    const nameValue = document.getElementById("name").value;
    const imageValue = document.getElementById("image").value;
    const ingredientsValue = document.getElementById("ingredients").value;
    const inStockValue = document.getElementById("inStock").value;
    const costValue = document.getElementById("cost").value;
    const isHasDeliveryValue = document.getElementById("isHasDelivery").checked;
    const streetValue = document.getElementById("street").value;
    const houseNumberValue = document.getElementById("houseNumber").value;
    const error = document.querySelector(".modal__error");

    if(
        nameValue === "" ||
        imageValue === "" ||
        ingredientsValue === "" ||
        inStockValue === "" ||
        costValue === "" ||
        isHasDeliveryValue === "" ||
        streetValue === "" ||
        houseNumberValue === ""
    ){
        error.innerHTML = "?????????????????? ?????? ????????";
    } else if(Number.isNaN(Number(inStockValue)) || Number.isNaN(Number(costValue)) || Number.isNaN(Number(houseNumberValue))){
        error.innerHTML = "?????????????? ???????????????????? ???????????? ?????? ?????????? 'in stock', 'cost' ?? 'house number'";
    } else if(ingredientsValue.split(", ").length <= 1){
        error.innerHTML = "?????????????? ?????????????????????? ?????????? ?????????????? ( ????????, ????????, ???????????? )";
    } else{
        error.innerHTML = "";

        createData({
            name: nameValue,
            image: imageValue,
            ingredients: ingredientsValue.split(", "),
            inStock: Number(inStockValue),
            cost: Number(costValue),
            hasDelivery: isHasDeliveryValue,
            address: {
                street: streetValue,
                houseNumber: Number(houseNumberValue)
            }
        });

        toggleClass(addItemModal, "open-modal");
        toggleClass(document.body, "body-overflow");
    }
}
// Open / Close modal
const addItemModal = document.querySelector(".modal");
const addItemModalForm = document.querySelector(".modal__form");
const addItemButton = document.querySelector(".add-sweet__button");

addItemModal.addEventListener("click", (event) => {
    if(event.target === event.currentTarget){
        toggleClass(addItemModal, "open-modal");
        toggleClass(document.body, "body-overflow");
    }
});
addItemModalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addItem();
})
addItemButton.addEventListener("click", () => {
    toggleClass(addItemModal, "open-modal");
    toggleClass(document.body, "body-overflow");
});

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

async function getData(){
    const response = await fetch(`${URL}/pastry`);
    const data = await response.json();

    return data;
}

function updateData(data, id){
    fetch(`${URL}/pastry/update/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
}

function deleteData(id){
    fetch(`${URL}/pastry/delete/${id}`, {
        method: "DELETE"
    }).then(() => renderItem());
}

function createData(data){
    fetch(`${URL}/pastry/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(() => renderItem());
}

// Activate functions
renderItem();