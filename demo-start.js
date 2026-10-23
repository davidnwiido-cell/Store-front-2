// grab the HTML elements//
const productContainer = document.querySelector(".product-container");
const cartBtn = document.getElementById("cart-btn");
const modalElem = document.getElementById("cart-modal");
const cartCountElem = document.getElementById("cart-count");
const closeBtn = document.querySelector(".close-btn");

let productsArray = [];
let cart = [];

// create a function to fetch store products from the free enpoint API
async function fetchProducts() {
    try {
        const response = await fetch ("https://fakestoreapi.com/products");
        const productsArray = await response.json();
        console.log(productsArray); 
        displayFetchedProducts(productsArray);
    } catch (error) {
        console.error("Error fetching products:", error);
        productContainer.innerHTML = "<p>Failed to load products...</p>"
    }
    
}

// create a function to display the prodyucts on the browser
function displayFetchedProducts(products) {
    const productCard = products.map((product) => {
        return `
            <div class="product-card">
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>${product.description.slice(0, 100)}...</p>
                <p class="price">$${product.price}</p>
                <button onclick= "addToCart(${product.id})"> Add to Cart </button>
            </div>
            `
    }).join("");
    productContainer.innerHTML = productCard;
}

// create a function to add item to cart
function addToCart(productId) {
    const product = productsArray.find((product) =>{
        return product.id === productId;
    })
    const existingProduct = cart.find((item) => {
        return item.id === productId;
    });

    if(existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({...product, quantity: 1})
    }

    updateCartInterface(); 
};

function updateCartInterface() {
    console.log("updating cart") 
    console.log
    // calculate the toatal count
    const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElem.innerText = totalCartItems;

    // item list 
    const cartContainer = document.getElementById("cart-items");
    console.log(cartContainer)
    cartContainer.innerHTML = cart.map((item) => {
        return `
        <div class="cart-items">
            <span>${item.title.slice(0, 15)}... (x${item.quantity})</span>
            <span>$${item.price * item.quantity}</span>
        </div>
        `
    }).join("");
}

// click the cart button to toggle and display the content of the cart
function toggleCart() {
    document.getElementById("cart-modal").classList.toggle("hidden");
}
cartBtn.addEventListener("click", toggleCart);
closeBtn.addEventListener("click", toggleCart);



// Load products when the page loads and the document finishes pasing
document.addEventListener("DOMContentLoaded", fetchProducts);