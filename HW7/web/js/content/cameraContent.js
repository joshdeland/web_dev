"use strict";
function cameraContent() {

var content = `
        <style>
            p {
                margin-left: 1.5rem;
            }
            .flexContainer {
                display: grid;
                grid: auto / 33% 33% 33%;
            }
            .flexContainer .obj {
                width: 33%; /* to fit three columns inside the flexContainer */
                box-sizing: border-box; /* makes padding and border counted in the width */
            }
        </style>
        <h3>Browsing Cameras</h3>
        <p>
          Explore our constantly growing selection of new and used cameras!
        </p>
    `;
        var ele = document.createElement("div");
        ele.innerHTML = content; // the HTML code specified just above...
        var cameraContainer = document.createElement("div");
        cameraContainer.classList.add('flexContainer'); // see styling in this file, above...
        ele.appendChild(cameraContainer);
        cameraContainer.appendChild(MakeCamera({name:"Sony A6000", thumbnail_img:"pics/sony_a6000.jpg", price:"450"}));
        cameraContainer.appendChild(MakeCamera({name:"Canon EOS 5D Mark IV", thumbnail_img:"pics/canon_5dmarkIV.jpg", price:"1500"}));
        cameraContainer.appendChild(MakeCamera({name:"Nikon Z6II", thumbnail_img:"pics/nikon_z6ii.jpg", price:"1600"}));
        cameraContainer.appendChild(MakeCamera({}));
        return ele;
}