let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    let total = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
    cartIcon.textContent = total;
};

calculation();

let generateCartItems = async () => {
    if (basket.length !== 0) {
        let res = await fetch("https://dummyjson.com/products");
        let data = await res.json();
        let products = data.products;

        shoppingCart.innerHTML = basket.map((x) => {
            let { id, item } = x;
            let search = products.find((y) => y.id === id) || [];
            return `
            <div class="cart-item">
                <img width="100" src=${search.thumbnail} alt="" />
                <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${search.title}</p>                    
                     <p class="cart-item-price">$ ${search.price}</p>
                        </h4>
                        <i class="bi bi-x-lg" onclick="removeItem(${id})"></i>
                    </div>
            
                    <div class="cart-buttons">
                        <div class="buttons">
                            <i class="fa-solid fa-minus" onclick="decrement(${id})"></i>
                            <div id=${id} class="quantity">${item}</div>
                            <i class="fa-solid fa-plus" onclick="increment(${id})"></i>                         </div>                     </div>                                  <h3>$ ${item * search.price}</h3>
                </div>
            </div>`;
        }).join("");
    } else {
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
          <button class="HomeBtn">Back to Home</button>
        </a>
        `;
    }
};

generateCartItems();

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

    generateCartItems();
    update(id);
    localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
    let search = basket.find((x) => x.id === id);

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }

    update(id);
    basket = basket.filter((x) => x.item !== 0);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    let element = document.getElementById(id);
    if (element) {
        element.textContent = search ? search.item : 0;
    }
    calculation();
};

let removeItem = (id) => {
    basket = basket.filter((x) => x.id !== id);
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
};