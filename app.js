const furnituresElement = document.querySelector("#furnitures");

const request = new XMLHttpRequest();
request.onreadystatechange = function () {
  if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    const furnitures = JSON.parse(this.responseText);
    console.log(furnitures);
    addFurnituresToPage(furnitures);
  } else console.log("error");
};

request.open("GET", "http://localhost:3000/api/furniture", true);
request.send();

function addFurnituresToPage(furnitures) {
  console.log("succes");
  furnitures.forEach((furniture) => {
    const furnitureDiv = document.createElement("div");
    furnitureDiv.className = "furnitures__container";

    const furnitureImage = document.createElement("img");
    furnitureImage.className = "furnitures__container__image";
    furnitureImage.src = furniture.imageUrl;

    const furnitureTitle = document.createElement("h2");
    furnitureTitle.className = "furnitures__container__title";
    furnitureTitle.textContent = furniture.name;

    const furniturePrice = document.createElement("p");
    furniturePrice.className = "furnitures__container__price";
    furniturePrice.textContent = `${furniture.price}€`;

    furnitureDiv.appendChild(furnitureImage);
    furnitureDiv.appendChild(furnitureTitle);
    furnitureDiv.appendChild(furniturePrice);

    furnituresElement.appendChild(furnitureDiv);
  });
}
