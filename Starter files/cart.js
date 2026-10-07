`<div class="cart-item">
                          <img width="100" src=${basket[i].thumbnail} alt="" />
                 <div class="details">
                    <div class="title-price-x">
                      <h4 class="title-price">
                        <p>${basket[i].title}</p>
                           <p class="cart-item-price">$ ${basket[i].price}</p>
                              </h4>
                         <i  class="bi bi-x-lg" onclick="remove(${i})"></i>
                       </div>
            
                <div class="cart-buttons">
                     <div class="buttons">
                          <i  class="fa-solid fa-minus" onclick="decreaseQuantity(${i})"></i>
                          <div id="product-quantity-${basket[i].id}" class="quantity">${basket[i].quantity}</div>
                             <i  class="fa-solid fa-plus" onclick="increaseQuantity(${i})"></i>
                        </div>
                   </div>
            
            <h3>$ ${basket[i].quantity * basket[i].price}</h3>
            
                 </div>
                    </div>`