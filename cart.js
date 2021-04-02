const cartItems = JSON.parse(localStorage.getItem("cart"));
const cartElement = document.querySelector("#cart");
const cartContainer = document.createElement("div");
cartContainer.className = "cart__container";
cartElement.appendChild(cartContainer);

const cartItemsArray = Object.values(cartItems);

console.log(cartItems);
console.log(cartItemsArray);

cartItemsArray.map((item) => {
  const cartUl = document.createElement("ul");
  cartUl.className = "cart__container__list";
  const nameLi = document.createElement("li");
  nameLi.className = "cart__container__list__name";
  nameLi.textContent = item.name;
  const priceLi = document.createElement("li");
  priceLi.className = "cart__container__list__price";
  priceLi.textContent = item.price;

  const quantityLi = document.createElement("li");
  quantityLi.className = "cart__container__list__quantity";

  const quantityChild = document.createElement("p");
  quantityChild.textContent = item.quantity;

  const decreaseBtn = document.createElement("button");
  decreaseBtn.className = "cart__container__list__quantity__button";
  decreaseBtn.textContent = "-";

  const increaseBtn = document.createElement("button");
  increaseBtn.className = "cart__container__list__quantity__button";
  increaseBtn.textContent = "+";
  const totalLi = document.createElement("li");
  totalLi.className = "cart__container__list__total";
  totalLi.textContent = item.totalPrice;
  const removeLi = document.createElement("li");
  removeLi.className = "cart__container__list__remove";
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "x";
  removeLi.appendChild(removeBtn);

  quantityLi.append(decreaseBtn, quantityChild, increaseBtn);
  cartUl.append(nameLi, priceLi, quantityLi, totalLi, removeLi);
  cartContainer.appendChild(cartUl);

  decreaseBtn.addEventListener("click", (e) => {
    if (item.quantity > 0) {
      item.quantity--;
      item.totalPrice = item.quantity * item.price;
      quantityChild.textContent = item.quantity;
      totalLi.textContent = item.totalPrice;
    }

    if (item.quantity < 1) {
      removefromArray(item);
      cartUl.remove();
      removeFromStorage(item);
    }
    console.log(cartItems);
    console.log(cartItemsArray);
  });

  increaseBtn.addEventListener("click", (e) => {
    if (item.quantity > 0) {
      item.quantity++;
      item.totalPrice = item.quantity * item.price;
      quantityChild.textContent = item.quantity;
      totalLi.textContent = item.totalPrice;
    }
    console.log(cartItems);
    console.log(cartItemsArray);
  });

  removeBtn.addEventListener("click", (e) => {
    removefromArray(item);
    cartUl.remove();
    removeFromStorage(item);
  });
});

function removefromArray(item) {
  cartItemsArray.splice(cartItemsArray.indexOf(item.id), 1);
  console.log(cartItems);
  console.log(cartItemsArray);
}

function removeFromStorage(item) {
  delete cartItems[item.id];
  console.log(cartItems);
  console.log(cartItemsArray);
}
