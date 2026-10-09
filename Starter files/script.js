/**
 *This HTML structure is given, required to generate this structure by using
  createElement , appendChild & createDocumentFragment methods,
  not by innerHTML method(important)
*/

// `<div id=product-id-${id} class="item" data-title=${title} data-img=${thumbnail} data-price=${price}>
//     <img width="220" src=${thumbnail} alt="">
//     <div class="details">
//       <h3>${title}</h3>
//       <p>${description}</p>
//       <div class="price-quantity">
//         <h2>$ ${price} </h2>
//         <div class="buttons">
//           <i class="fa-solid fa-minus"></i>
//           <div id=${id} class="quantity">${
//       search.itemQuantity === undefined ? 0 : search.itemQuantity
//     }</div>
//           <i class="fa-solid fa-plus"></i>
//         </div>
//       </div>
//     </div>
// </div>`;

// API URL
const requestURL = "https://dummyjson.com/products";
let shop = document.getElementById("shop");
let basket = JSON.parse(localStorage.getItem("data")) || [];

async function getElements() {
    let res = await fetch(requestURL);
    let data = await res.json();
    let products = data.products;

    shop.innerHTML = "";

    products.forEach((product) => {
        let search = basket.find((x) => x.id === product.id);
        let currentQuantity = search ? search.item : 0;

        shop.innerHTML += `
        <div id=product-id-${product.id} class="item">
            <img width="220" src="${product.thumbnail}" alt="">
            <div class="details">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <div class="price-quantity">
                    <h2>$ ${product.price}</h2>
                    <div class="buttons">
                        <i class="fa-solid fa-minus"></i>
                        <div id="${product.id}" class="quantity">${currentQuantity}</div>
                        <i onclick="increment(${product.id})" class="fa-solid fa-plus"></i>
                    </div>
                </div>
            </div>
        </div>`;
    });

    calculation();
}

getElements();

let increment = (id) => {
    let search = basket.find((x) => x.id === id);

    if (search === undefined) {
        basket.push({
            id: id,
            item: 1,
        });
    } else {
        search.item += 1;
    }

    update(id);
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).textContent = search ? search.item : 0;
    calculation();
};

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    let total = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
    cartIcon.textContent = total;
};

calculation();