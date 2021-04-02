const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

const request = new XMLHttpRequest();
request.onreadystatechange = function () {
  if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    const product = JSON.parse(this.responseText);
    addProductToPage(product);
    // console.log(product);
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
  productPrice.textContent = `${product.price}€`;

  const productDescription = document.createElement("p");
  productDescription.className = "product__container__description";
  productDescription.textContent = product.description;

  const productVarnishDropDown = document.createElement("div");
  productVarnishDropDown.className = "product__container__dropDown";

  const productVarnishDropDownButton = document.createElement("button");
  productVarnishDropDownButton.className =
    "product__container__dropDown__button";
  productVarnishDropDownButton.textContent = "Varnish options";

  const productVarnishDropDownList = document.createElement("ul");
  productVarnishDropDownList.className =
    "product__container__dropDown__varnish";

  const productOrder = document.createElement("button");
  productOrder.className = "product__container__order";
  productOrder.textContent = "Add to Cart";

  productElement.appendChild(productDiv);
  productDiv.appendChild(productImg);
  productDiv.appendChild(productTitle);
  productDiv.appendChild(productPrice);
  productDiv.appendChild(productDescription);
  productDiv.appendChild(productVarnishDropDown);
  productVarnishDropDown.appendChild(productVarnishDropDownButton);
  productVarnishDropDown.appendChild(productVarnishDropDownList);

  for (let i = 0; i < product.varnish.length; i++) {
    const productVarnishOption = document.createElement("li");
    productVarnishOption.textContent = product.varnish[i];
    productVarnishDropDownList.appendChild(productVarnishOption);
  }

  productDiv.appendChild(productOrder);

  let productInCart = {
    id: product._id,
    name: product.name,
    price: product.price,
    quantity: 0,
    totalPrice: 0,
  };

  productOrder.addEventListener("click", (e) => {
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
  });
}
