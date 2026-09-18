// Product Data 

let products = [
    {
        id: 1,
        name: "T-shirt",
        price: 499,
        category: "fashion"
    },

    {
        id: 2, 
        name: "Smart Watch",
        price: 2499,
        category: "electronics"
    },

    {
        id: 3,
        name: "Running Shoes",
        price: 1499,
        category: "fashion"
    },

    {
        id: 4,
        name: "Headphones",
        price: 999,
        category: "electronics"
    },

    {
        id: 5,
        name: "Backpack",
        price: 1199,
        category: "fashion"
    },

    {
        id: 6,
        name: "Bag",
        price: 1399,
        category: "fashion"
    },

    {
        id: 7,
        name: "Denim Jacket",
        price: 1999,
        category: "fashion"
    }
];

// Cart

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display Products

function displayProducts(productList) {

    let container = document.querySelector("#products");
    container.innerHTML = "";

    if (productList.length === 0) {
        container.innerText = "❌ No products found";
        return;
    }

    for (let i = 0; i < productList.length; i++) {

        let card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

        <h3>${productList[i].name}</h3>
        
        <p>Price: ₹${productList[i].price}</p>

        <button onclick="addToCart(${productList[i].id})">🛒 Add to Cart</button>
        
        `;

        container.appendChild(card);
        }
}

// Search + Filter

function searchAndFilter() {
    let searchText = document.querySelector("#searchInput").value.toLowerCase();

    let filter = document.querySelector("#priceFilter").value;

    let category = document.querySelector("#categoryFilter").value;

    let filteredProducts = products.filter(function(product) {
        
        // Search condition

        let matchesSearch = product.name .toLowerCase() .includes(searchText);

        // Price condition 

        let matchesPrice = true;

        if (filter === "under500") {

            matchesPrice = product.price < 500;
        }

        else if (filter === "500to1000") {

            matchesPrice = product.price >= 500 && product.price <= 1000;
        }

        else if (filter === "1000to2000") {

            matchesPrice = product.price >= 1000 && product.price <= 2000;
        }

        else if (filter === "above2000") {
            matchesPrice = product.price > 2000;
        }

        let matchesCategory = category === "all" || product.category === category;

        return matchesSearch && matchesPrice && matchesCategory;

    });

    displayProducts(filteredProducts);
}

// Add to Cart 

function addToCart(productId) {

    let product = products.find(function(item) {
        return item.id === productId;

    });

    cart.push(product);

    saveCart();

    displayCart();
}

// Display Cart

function  displayCart() {
    
    let cartContainer = document.querySelector("#cart");

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerText = "🛒 Your cart is empty";

        document.querySelector("#cartTotal").innerText = 0;

        document.querySelector("#cartCount").innerText = 0;

        return;
    }

    let total = 0;

    for (let i = 0; i < cart.length; i++) {

        let item = document.createElement("div");

        item.className = "cart-item";

        item.innerHTML = `
        
        <h3>${cart[i].name}</h3>
        
        <p>Price: ₹${cart[i].price}</p>

        <button onclick="removeFromCart(${i})">🗑️ Remove</button>`;

        cartContainer.appendChild(item);

        total = total + cart[i].price;
    }

    document.querySelector("#cartTotal") .innerText = total;

    document.querySelector("#cartCount") .innerText = cart.length;
}

// Remove from Cart 

function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();

    displayCart();
}

// Save Cart

function saveCart() {
     
    localStorage.setItem("cart", JSON.stringify(cart));

}

// Checkout

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Checkout successful! 🎉");
}
// Clear Cart 

function clearCart() {

    cart = [];

    localStorage.removeItem("cart");

    displayCart();

}

// Dark Mode

function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");

    let button = document.querySelector("#darkButton");

    if (document.body.classList.contains("dark-mode")
    ) {

        button.innerText = "☀️ Light Mode";
    } else {

        button.innerText = "🌙 Dark Mode";
    }
}

// Start Website

displayProducts(products);

displayCart();

console.log(products);
console.log(cart);