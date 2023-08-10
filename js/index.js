const openCartBtn = document.querySelector(".open-cart-btn");
const openSideCart = document.querySelector(".side-cart");
const closeSideCart = document.querySelector(".close-btn");

openCartBtn.addEventListener('click', openCart);
closeSideCart.addEventListener('click', closeCart);
// Open cart
function openCart() {
    openSideCart.classList.add('open');
}

// close cart
function closeCart() {
    openSideCart.classList.remove('open');
}
 
 //Creating products
 const products =[
    {
        id:0,
        title: 'Bananas',
        price: 30.99,
        instock:100,
        image:'banana2.jpg',  
        
    },

    {
        id:1,
        title: 'Apples',
        price: 25.99,
        instock:100,
        image:'apples.jpg',

    },{
        id:2,
        title: 'Grapes',
        price: 27.99,
        instock:100,
        image:'grapes.jpg',
        
    },{
        id:3, 
        title: 'Carrots',
        price: 35.95,
        instock:100,
        image:'carrots2.jpg',  
       
    },{
        id:4,
        title: 'Fruit Combo',
        price: 99.99,
        instock:100,
        image:'fruitcombo2.jpg',  
       
    },{
        id:5,
        title: 'Vegetables Combo',
        price: 111.99,
        instock:100,
        image:'vegecombo.jpg', 
    },
 ];

//elements to select
const productsElements = document.querySelector(".shopping-products");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const totalItemsInCartEl = document.querySelector(".total-items-in-cart");
function renderProducts() {
    products.forEach((product) => {
        productsElements.innerHTML += `
        <style>
        #addtocart.hidden{
            display:none;
        }
        </style>
          <div class="box">
            <img class="img-box" src="${product.image}" alt="${product.title}">
            <h3 class="product-title">${product.title}</h3>
            <div class="bottom ">
                <h5 class="product-price">R <span class="price">${product.price}</span></h5>
                <button class="button button-small px-5 button-border border-color m-0 color 
                h-bg-color h-text-light mt-2" id="addtocart" onclick="addtocart(${product.id})">Add To Cart</button>
                <!-- <div class="product-quantity">
                    <button id="decrease-quantity" class="decrease-btn"><i class="fas fa-minus"></i></button>
                    <input id="quantity" type="number" min="0" class="quantity-value form-control text-center" value="0">
                    <button id="increase-quantity" class="increase-btn"><i class="fas fa-plus"></i></button>
                </div> -->
            </div>
        </div>
      
          `;
    });
}
renderProducts();
    
    let cart =JSON.parse(localStorage.getItem("CART")) || [];
    updateCart();

    function addtocart(id){

    //check if product exists in cart
    if (cart.some((item) => item.id === id)) {
        changeNumberOfUnits("plus", id);
    } else {
        const item = products.find((product) => product.id === id);

        cart.push({
            ...item,
            numberOfUnits: 1,
        });
    }

    updateCart();
    }
//update cart
function updateCart() {
    renderCartItems();
    renderSubtotal();

    // save cart to local storage
    localStorage.setItem("CART", JSON.stringify(cart));
}

//calculate and save locally
function renderSubtotal() {
    let totalPrice = 0,
        totalItems = 0;

    cart.forEach((item) => {
        totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits;
    });

    subtotalEl.innerHTML = `Subtotal (${totalItems} items): R ${totalPrice.toFixed(2)}`;
    totalItemsInCartEl.innerHTML = totalItems;
}

//Show cart items
function renderCartItems() {
    // Clear cart item
    cartItemsEl.innerHTML = "";
    cart.forEach((item) => {
        cartItemsEl.innerHTML += `
          <div class="cart-item">
                <div class="remove-item" onclick="removeItemFromCart(${item.id})">x</div>
              <div class="item-info" >
                  <img src="${item.image}" alt="${item.title}">
              </div>
              <div class="unit-price">
                <h4>${item.title}</h4>
                  <small>R</small>${item.price}
              </div>
              <div class="units">
                  <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                  <div class="number">${item.numberOfUnits}</div>
                  <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>           
              </div>
          </div>
        `;
    });
}

// Remove cart item
function removeItemFromCart(id) {
    cart = cart.filter((item) => item.id !== id);

    updateCart();
}

// Make changes to the cart items 
function changeNumberOfUnits(action, id) {
    cart = cart.map((item) => {
        let numberOfUnits = item.numberOfUnits;

        if (item.id === id) {
            if (action === "minus" && numberOfUnits > 1) {
                numberOfUnits--;
            } else if (action === "plus" && numberOfUnits < item.instock) {
                numberOfUnits++;
            }
        }

        return {
            ...item,
            numberOfUnits,
        };
    });

    updateCart();
}

