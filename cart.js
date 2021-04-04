const cartItems = JSON.parse(localStorage.getItem("cart"));
const cartElement = document.querySelector("#cart");
const cartContainer = document.createElement("div");
cartContainer.className = "cart__container";
cartElement.appendChild(cartContainer);
const cartItemsArray = Object.values(cartItems);

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
      decreaseQuantity(item);
      quantityChild.textContent = item.quantity;
      totalLi.textContent = item.totalPrice;
    }

    if (item.quantity < 1) {
      removeFromCart(item);
      cartUl.remove();
    }
    calculateTotalOrder();
  });

  increaseBtn.addEventListener("click", (e) => {
    increaseQuantity(item);
    quantityChild.textContent = item.quantity;
    totalLi.textContent = item.totalPrice;
    calculateTotalOrder();
  });

  removeBtn.addEventListener("click", (e) => {
    removeFromCart(item);
    cartUl.remove();
    calculateTotalOrder();
  });
});

const totalDiv = document.createElement("div");
totalDiv.className = "cart__container__list";

const totalLabel = document.createElement("p");
totalLabel.className = "total__container__list__totalLabel";
totalLabel.textContent = "Total";
const totalOrder = document.createElement("p");
totalOrder.className = "total__container__list__total";
totalOrder.id = "totalId";

totalDiv.append(totalLabel, totalOrder);
cartContainer.appendChild(totalDiv);

calculateTotalOrder();

function decreaseQuantity(item) {
  item.quantity--;
  item.totalPrice = item.quantity * item.price;
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

function increaseQuantity(item) {
  item.quantity++;
  item.totalPrice = item.quantity * item.price;
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

function removeFromCart(item) {
  cartItemsArray.splice(cartItemsArray.indexOf(item), 1);
  delete cartItems[item.id];
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

function calculateTotalOrder() {
  let totalPriceOrder = 0;
  for (let i = 0; i < cartItemsArray.length; i++) {
    totalPriceOrder = totalPriceOrder + cartItemsArray[i].totalPrice;
  }
  const totalElt = document.getElementById("totalId");
  return (totalElt.textContent = totalPriceOrder);
}

// const formContainer = document.createElement("form");
// formContainer.className = "form__container";
// const surname = document.createElement("input");
// surname.labels = "Surname";
// const firstname = document.createElement("input");
// const emailAddress = document.createElement("input");
// const address = document.createElement("input");
// const zipcode = document.createElement("input");
// const city = document.createElement("input");

// formContainer.append(surname, firstname, emailAddress, address, zipcode, city);
// cartElement.appendChild(formContainer);
