const cartItems = JSON.parse(localStorage.getItem("cart"));

addCartToPage(cartItems);

function addCartToPage(cartItems) {
  const cartElement = document.querySelector("#cart");
  const cartContainer = document.createElement("div");
  cartContainer.className = "cart__container";
  cartElement.appendChild(cartContainer);

  if (cartItems) {
    const cartItemsArray = Object.values(cartItems);
    cartItemsArray.map((item) => {
      const cartUl = document.createElement("ul");
      cartUl.className = "cart__container__list";
      const nameLi = document.createElement("li");
      nameLi.className = "cart__container__list__name";
      nameLi.textContent = item.name;
      const priceLi = document.createElement("li");
      priceLi.className = "cart__container__list__price";
      priceLi.textContent = `${item.price / 100}€`;

      const quantityLi = document.createElement("li");
      quantityLi.className = "cart__container__list__quantity";

      const quantityChild = document.createElement("p");
      quantityChild.textContent = item.quantity;

      const decreaseBtn = document.createElement("button");
      decreaseBtn.className = "cart__container__list__quantity__button";
      decreaseBtn.innerHTML = `<i class="fas fa-minus-circle"></i>`;

      const increaseBtn = document.createElement("button");
      increaseBtn.className = "cart__container__list__quantity__button";
      increaseBtn.innerHTML = `<i class="fas fa-plus-circle"></i>`;
      const totalLi = document.createElement("li");
      totalLi.className = "cart__container__list__total";
      totalLi.textContent = `${item.totalPrice / 100}€`;
      const removeLi = document.createElement("li");
      removeLi.className = "cart__container__list__remove";
      const removeBtn = document.createElement("button");
      removeBtn.innerHTML = `<i class="fas fa-times-circle"></i>`;
      removeLi.appendChild(removeBtn);

      quantityLi.append(decreaseBtn, quantityChild, increaseBtn);
      cartUl.append(nameLi, priceLi, quantityLi, totalLi, removeLi);
      cartContainer.appendChild(cartUl);

      decreaseBtn.addEventListener("click", (e) => {
        if (item.quantity > 0) {
          decreaseQuantity(item);
          quantityChild.textContent = item.quantity;
          totalLi.textContent = `${item.totalPrice / 100}€`;
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
        totalLi.textContent = `${item.totalPrice / 100}€`;
        calculateTotalOrder();
      });

      removeBtn.addEventListener("click", (e) => {
        removeFromCart(item);
        cartUl.remove();
        calculateTotalOrder();
      });
    });

    const totalDiv = document.createElement("div");
    totalDiv.className =
      "cart__container__list cart__container__list--totalRow";

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
      return (totalElt.textContent = `${totalPriceOrder / 100}€`);
    }
  }
}

document.querySelector("form").addEventListener("submit", handleFormOrder);

function handleFormOrder(e) {
  e.preventDefault();
  let errorForm = false;

  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const address = document.getElementById("address");
  const city = document.getElementById("city");
  const email = document.getElementById("email");

  if (!firstName.value) {
    firstName.nextElementSibling.classList.remove("hidden");
    errorForm = true;
  }
  if (!lastName.value) {
    lastName.nextElementSibling.classList.remove("hidden");
    errorForm = true;
  }
  if (!address.value) {
    address.nextElementSibling.classList.remove("hidden");
    errorForm = true;
  }
  if (!city.value) {
    city.nextElementSibling.classList.remove("hidden");
    errorForm = true;
  }
  if (!email.value) {
    email.nextElementSibling.classList.remove("hidden");
    errorForm = true;
  }

  if (!errorForm) {
    let order = {
      contact: {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
      },
      products: getProductsId(),
    };

    const request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3000/api/furniture/order");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(order));

    afterOrderSent();
  }
}

function getProductsId() {
  let productsId = [];
  for (cartItem in cartItems) {
    productsId.push(cartItem);
  }
  return productsId;
}

function afterOrderSent() {
  localStorage.clear("cart");
  document.querySelector("main").classList.add("hidden");
  const orderOk = document.querySelector("#orderOk");
  orderOk.classList.replace("hidden", "visible");
}
