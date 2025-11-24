// TripurnaRasa Restaurant Management App Script

// Mock data
const restaurants = [
    { id: 1, name: "Jade Palace", location: { lat: 40.7128, lng: -74.0060 }, address: "New York, NY" },
    { id: 2, name: "Dragon Warrior Diner", location: { lat: 34.0522, lng: -118.2437 }, address: "Los Angeles, CA" },
    { id: 3, name: "Valley of Peace Bistro", location: { lat: 41.8781, lng: -87.6298 }, address: "Chicago, IL" },
    { id: 4, name: "Wuxi Finger Hold", location: { lat: 29.7604, lng: -95.3698 }, address: "Houston, TX" }
];

const menuItems = [
    { id: 1, name: "Dumplings of Destiny", category: "appetizers", price: 8.99, description: "Steamed dumplings filled with wisdom" },
    { id: 2, name: "Noodle Soup Supreme", category: "main", price: 12.99, description: "Hand-pulled noodles in rich broth" },
    { id: 3, name: "Fortune Cookie Wisdom", category: "desserts", price: 4.99, description: "Cookies with motivational messages" },
    { id: 4, name: "Green Tea Elixir", category: "drinks", price: 3.99, description: "Refreshing tea from the mountains" },
    { id: 5, name: "Kung Fu Fried Rice", category: "main", price: 10.99, description: "Rice stir-fried with vegetables and tofu" },
    { id: 6, name: "Spring Rolls of Serenity", category: "appetizers", price: 6.99, description: "Crispy rolls filled with peace" }
];

let cart = [];
let currentUser = null;

// Initialize tooltips
document.addEventListener('DOMContentLoaded', function() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Load cart from localStorage
    loadCart();

    // Initialize specific page functions
    if (document.getElementById('loginForm')) {
        initLogin();
    }
    if (document.getElementById('getLocationBtn')) {
        initRestaurants();
    }
    if (document.getElementById('menuItems')) {
        initMenu();
    }
    if (document.getElementById('orderItems')) {
        initOrder();
    }
    if (document.getElementById('billingForm')) {
        initBilling();
    }
});

// Login/Signup functions
function initLogin() {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Mock login
        if (username && password) {
            currentUser = { username };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        alert('Welcome to TripurnaRasa, ' + username + '!');
            window.location.href = 'index.html';
        }
    });

    document.getElementById('signupFormEl').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('newUsername').value;
        const password = document.getElementById('newPassword').value;
        
        // Mock signup
        if (username && password) {
            currentUser = { username };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            alert('Welcome to TripurnaRasa, ' + username + '! Your account has been created.');
            window.location.href = 'index.html';
        }
    });
}

function showSignup() {
    document.getElementById('signupForm').style.display = 'block';
}

// Restaurants functions
function initRestaurants() {
    document.getElementById('getLocationBtn').addEventListener('click', function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showRestaurants, showError);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    });
}

function showRestaurants(position) {
    const userLat = position.coords.latitude;
    const userLng = position.coords.longitude;
    
    // Mock filtering restaurants within 500km
    const nearbyRestaurants = restaurants.filter(restaurant => {
        const distance = getDistance(userLat, userLng, restaurant.location.lat, restaurant.location.lng);
        return distance < 500; // 500km radius
    });
    
    displayRestaurants(nearbyRestaurants);
}

function showError(error) {
    // Mock: show all restaurants if geolocation fails
    displayRestaurants(restaurants);
}

function displayRestaurants(restaurantList) {
    const container = document.getElementById('restaurantsList');
    container.innerHTML = '';
    
    restaurantList.forEach(restaurant => {
        const card = document.createElement('div');
        card.className = 'col-md-6 restaurant-card';
        card.innerHTML = `
            <h5>${restaurant.name}</h5>
            <p>${restaurant.address}</p>
            <button class="btn btn-primary" onclick="selectRestaurant(${restaurant.id})">Select</button>
        `;
        container.appendChild(card);
    });
}

function selectRestaurant(id) {
    localStorage.setItem('selectedRestaurant', id);
    window.location.href = 'menu.html';
}

function getDistance(lat1, lng1, lat2, lng2) {
    // Haversine formula for distance calculation
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Menu functions
function initMenu() {
    displayMenuItems('all');
    
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            displayMenuItems(category);
        });
    });
}

function displayMenuItems(category) {
    const container = document.getElementById('menuItems');
    container.innerHTML = '';
    
    const filteredItems = category === 'all' ? menuItems : menuItems.filter(item => item.category === category);
    
    filteredItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'col-md-6 menu-item';
        card.innerHTML = `
            <h5>${item.name}</h5>
            <p>${item.description}</p>
            <p>$${item.price.toFixed(2)}</p>
            <button class="btn btn-success" onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        container.appendChild(card);
    });
}

function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    const existingItem = cart.find(i => i.id === itemId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    
    saveCart();
    alert('Added to cart!');
}

// Order functions
function initOrder() {
    displayOrderItems();
    updateCartDisplay();
}

function displayOrderItems() {
    const container = document.getElementById('orderItems');
    container.innerHTML = '';
    
    menuItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'col-md-6 menu-item';
        card.innerHTML = `
            <h5>${item.name}</h5>
            <p>${item.description}</p>
            <p>$${item.price.toFixed(2)}</p>
            <button class="btn btn-success" onclick="addToCart(${item.id})">Add to Order</button>
        `;
        container.appendChild(card);
    });
}

// Billing functions
function initBilling() {
    displayBillingSummary();
    
    document.getElementById('billingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // Mock order completion
        alert('Order completed! Thank you for choosing TripurnaRasa Restaurant.');
        cart = [];
        saveCart();
        window.location.href = 'index.html';
    });
}

function displayBillingSummary() {
    const container = document.getElementById('billingSummary');
    let total = 0;
    
    container.innerHTML = '<h4>Order Summary</h4>';
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        container.innerHTML += `<p>${item.name} x${item.quantity}: $${itemTotal.toFixed(2)}</p>`;
    });
    container.innerHTML += `<hr><p><strong>Total: $${total.toFixed(2)}</strong></p>`;
}

// Cart functions
function updateCartDisplay() {
    const container = document.getElementById('cartItems');
    const totalEl = document.getElementById('cartTotal');
    let total = 0;
    
    container.innerHTML = '';
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <p>${item.name} x${item.quantity}: $${itemTotal.toFixed(2)}</p>
            <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Remove</button>
        `;
        container.appendChild(cartItem);
    });
    
    totalEl.textContent = total.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartDisplay();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    if (document.getElementById('cartItems')) {
        updateCartDisplay();
    }
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}
