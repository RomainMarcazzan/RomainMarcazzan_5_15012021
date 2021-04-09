const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

const request = new XMLHttpRequest();
request.onreadystatechange = function () {
  if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    const product = JSON.parse(this.responseText);
    addProductToPage(product);
  } else console.log("error");
};

request.open("GET", `http://localhost:3000/api/furniture/${id}`, true);
request.send();

const productElement = document.querySelector("#product");

function addProductToPage(product) {
  const productDiv = document.createElement("div");
  productDiv.className = "product__container";

  const productImg = document.createElement("img");
  productImg.className = "product__container__image";
  productImg.src = product.imageUrl;

  const productTitle = document.createElement("h1");
  productTitle.className = "product__container__title";
  productTitle.textContent = product.name;

  const productPrice = document.createElement("p");
  productPrice.className = "product__container__price";
  productPrice.textContent = `${product.price / 100}€`;

  const productDescription = document.createElement("p");
  productDescription.className = "product__container__description";
  productDescription.textContent = product.description;

  const productButtonsContainer = document.createElement("div");
  productButtonsContainer.className = "product__container__buttonsContainer";

  const productVarnishDropDownContainer = document.createElement("div");
  productVarnishDropDownContainer.className =
    "product__container__buttonsContainer__dropDownContainer";

  const productVarnishDropDownContainerButton = document.createElement(
    "button"
  );
  productVarnishDropDownContainerButton.textContent = "Varnish options";

  const productVarnishDropDownContainerList = document.createElement("ul");

  const productButtonOrder = document.createElement("button");
  productButtonOrder.className = "product__container__buttonsContainer__order";
  productButtonOrder.textContent = "Add to Cart";

  productElement.appendChild(productDiv);
  productDiv.append(
    productImg,
    productTitle,
    productPrice,
    productDescription,
    productButtonsContainer
  );
  productButtonsContainer.append(
    productVarnishDropDownContainer,
    productButtonOrder
  );

  productVarnishDropDownContainer.append(
    productVarnishDropDownContainerButton,
    productVarnishDropDownContainerList
  );

  for (let i = 0; i < product.varnish.length; i++) {
    const productVarnishOption = document.createElement("li");
    productVarnishOption.textContent = product.varnish[i];
    productVarnishDropDownContainerList.appendChild(productVarnishOption);
  }

  productButtonOrder.addEventListener("click", addItemToCart);

  function addItemToCart() {
    let productInCart = {
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: 0,
      totalPrice: 0,
    };

    let cartItems = localStorage.getItem("cart");
    cartItems = JSON.parse(cartItems);

    if (cartItems !== null) {
      if (cartItems[product._id] === undefined) {
        cartItems = {
          ...cartItems,
          [product._id]: productInCart,
        };
      }
      cartItems[product._id].quantity += 1;
      cartItems[product._id].totalPrice += cartItems[product._id].price;
    } else {
      productInCart.quantity = 1;
      productInCart.totalPrice = productInCart.price;
      cartItems = {
        [product._id]: productInCart,
      };
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));

    window.location.replace("./cart.html");
  }
}
