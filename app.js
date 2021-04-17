// const request = new XMLHttpRequest();
// request.onreadystatechange = function () {
//   if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
//     const furnitures = JSON.parse(this.responseText);
//     addFurnituresToPage(furnitures);
//   } else console.log(this.status);
// };

// request.open("GET", "http://localhost:3000/api/furniture");
// request.send();

ajaxGet("http://localhost:3000/api/furniture", addFurnituresToPage);

function addFurnituresToPage(furnitures) {
  const furnituresElement = document.querySelector("#furnitures");
  furnitures.forEach((furniture) => {
    const furnitureDiv = document.createElement("div");
    furnitureDiv.className = "furnitures__container";

    const furnitureLink = document.createElement("a");
    furnitureLink.href = `./product.html?id=${furniture._id}`;

    const furnitureImage = document.createElement("img");
    furnitureImage.className = "furnitures__container__image";
    furnitureImage.src = furniture.imageUrl;

    const furnitureInfoDiv = document.createElement("div");
    furnitureInfoDiv.className = "furnitures__container__info";

    const furnitureTitle = document.createElement("h2");
    furnitureTitle.className = "furnitures__container__info__title";
    furnitureTitle.textContent = furniture.name;

    const furniturePrice = document.createElement("p");
    furniturePrice.className = "furnitures__container__info__price";
    furniturePrice.textContent = `${furniture.price / 100}€`;

    furnituresElement.appendChild(furnitureDiv);
    furnitureDiv.appendChild(furnitureLink);
    furnitureLink.appendChild(furnitureImage);
    furnitureDiv.appendChild(furnitureInfoDiv);
    furnitureInfoDiv.appendChild(furnitureTitle);
    furnitureInfoDiv.appendChild(furniturePrice);
  });
}
