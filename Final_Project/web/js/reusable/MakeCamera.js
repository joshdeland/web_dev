"use strict";

function MakeCamera({
  name = "Name N/A",
  thumbnail_img = "pics/placeholder_thumbnail.jpg",
  price = "Price N/A",
}) {
  var cameraObj = document.createElement("div");
  cameraObj.classList.add("camera"); // adds styling to ele - see obj.css rules for ".obj"

  // Price is private
  var camPrice = price;

  cameraObj.innerHTML = `
  <div class='cameraInfo'></div>
  <button class='nameButton'>Change Name to: </button>
  <input class='newNameInput'/> <br/>
  <button class='priceButton'>Change Price By Factor: </button>
  <input class='priceFactorInput'/> 
`;

  // Create variable references for all DOM elements (above) that we need to programatically access.
  var cameraInfo = cameraObj.getElementsByClassName("cameraInfo")[0];
  var nameButton = cameraObj.getElementsByClassName("nameButton")[0];
  var newNameInput = cameraObj.getElementsByClassName("newNameInput")[0];
  var priceButton = cameraObj.getElementsByClassName("priceButton")[0];
  var priceFactor = cameraObj.getElementsByClassName("priceFactorInput")[0];

  var display = function () {
    cameraInfo.innerHTML = `<h3>${name}</h3>
    <img src="${thumbnail_img}">
    <h3>\$${camPrice}</h3>`;
  };

  display();

  // Change camera name
  cameraObj.setName = function (newName) {
    name = newName;
    display(); // show updated property on the page
  };

  // Change price by a specified factor
  cameraObj.changePrice = function (changeRate) {
    var n = Number(changeRate);
    console.log("changing price by this rate " + n);
    camPrice = camPrice * (1 + n);
    display(); // show updated price on the page
  };

  nameButton.onclick = function () {
    cameraObj.setName(newNameInput.value);
  };

  priceButton.onclick = function () {
    cameraObj.changePrice(priceFactor.value);
  };

  return cameraObj;
}
