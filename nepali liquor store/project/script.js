// Sample liquor data with Nepali brands
const liquors = [
    {
        id: 1,
        name: "Khukuri Rum XXX",
        category: "rum",
        price: 1850,
        image: "images/khukurirum.png",
        description: "Premium aged rum from Nepal's finest distillery",
        badge: "Best Seller"
    },
    {
        id: 2,
        name: "Old Durbar Whisky",
        category: "whisky",
        price: 2200,
        image: "images/olddurbar.png",
        description: "Smooth blended whisky with rich Himalayan heritage",
        badge: "Premium"
    },
    {
        id: 3,
        name: "Signature Whisky Reserve",
        category: "whisky",
        price: 2800,
        image: "images/Signature.jpg",
        description: "Aged 12 years, double distilled for premium taste",
        badge: "Limited"
    },
    {
        id: 4,
        name: "Ruslan Vodka Premium",
        category: "vodka",
        price: 1650,
        image: "images/Ruslan.jpg",
        description: "Crystal clear vodka with smooth finish",
        badge: "Popular"
    },
    {
        id: 5,
        name: "Coronation Rum Gold",
        category: "rum",
        price: 1950,
        image: "images/coronation.jpeg",
        description: "Golden rum with tropical notes and smooth finish",
        badge: "New"
    },
    {
        id: 6,
        name: "Gorkha Beer Premium",
        category: "beer",
        price: 320,
        image: "images/gorkha.jpeg",
        description: "Nepal's finest lager beer, crisp and refreshing",
        badge: "Local"
    },
    {
        id: 7,
        name: "Everest Beer Strong",
        category: "beer",
        price: 280,
        image: "images/everest.jpeg",
        description: "Strong beer with 8% alcohol content",
        badge: "Strong"
    },
    {
        id: 8,
        name: "Tuborg Beer",
        category: "beer",
        price: 290,
        image: "images/Tuborg.webp",
        description: "International premium lager beer",
        badge: "Import"
    },
    {
        id: 9,
        name: "Royal Stag Whisky",
        category: "whisky",
        price: 2400,
        image: "images/royalstag.jpeg",
        description: "Smooth blend of grain and malt whiskies",
        badge: "Premium"
    },
    {
        id: 10,
        name: "Khukuri Spiced Rum",
        category: "rum",
        price: 1750,
        image: "images/spiced.png",
        description: "Spiced rum with authentic Nepali herbs and spices",
        badge: "Spiced"
    },
    {
        id: 11,
        name: "Mountain Whisky Deluxe",
        category: "whisky",
        price: 3200,
        image: "images/Highlandmountain.jpg",
        description: "Himalayan premium whisky aged in oak barrels",
        badge: "Deluxe"
    },
    {
        id: 12,
        name: "Nepal Ice Beer",
        category: "beer",
        price: 250,
        image: "images/nepalbeer.jpeg",
        description: "Light refreshing beer perfect for hot weather",
        badge: "Light"
    },
    {
        id: 13,
        name: "Himalayan Vodka Pure",
        category: "vodka",
        price: 1800,
        image: "images/highlander.png",
        description: "Pure vodka distilled from Himalayan spring water",
        badge: "Pure"
    },
    {
        id: 14,
        name: "Royal Wine Red",
        category: "wine",
        price: 2500,
        image: "images/royal.jpg",
        description: "Premium red wine with rich berry flavors",
        badge: "Wine"
    },
    {
        id: 15,
        name: "Sherpa Wine White",
        category: "wine",
        price: 2200,
        image: "images/sherpa.jpg",
        description: "Crisp white wine with floral notes",
        badge: "Local"
    },
    {
        id: 16,
        name: "Dragon Rum Dark",
        category: "rum",
        price: 2100,
        image: "images/dragon.avif",
        description: "Dark rum with caramel and vanilla notes",
        badge: "Dark"
    },
    {
        id: 17,
        name: "Ambassador Whisky",
        category: "whisky",
        price: 1950,
        image: "images/ambassador.jpeg",
        description: "Classic blended whisky with smooth character",
        badge: "Classic"
    },
    {
        id: 18,
        name: "Tiger Beer Nepal",
        category: "beer",
        price: 310,
        image: "images/nepaltiger.png",
        description: "Premium lager with distinctive taste",
        badge: "Premium"
    },
    {
        id: 19,
        name: "Crystal Vodka",
        category: "vodka",
        price: 1550,
        image: "images/crystal.jpeg",
        description: "Triple distilled vodka with crystal clarity",
        badge: "Crystal"
    },
    {
        id: 20,
        name: "Mustang Wine Rosé",
        category: "wine",
        price: 2800,
        image: "images/mustang.jpg",
        description: "Elegant rosé wine from Mustang valley",
        badge: "Rosé"
    }
];

// Shopping cart
let cart = [];

// User authentication
let currentUser = null;

// Age verification
document.addEventListener('DOMContentLoaded', function() {
    // Show age verification modal
    const ageModal = document.getElementById('ageModal');
    const confirmAge = document.getElementById('confirmAge');
    const denyAge = document.getElementById('denyAge');

    // Check if user has already verified age
    if (true) {
        ageModal.style.display = 'flex';
    } else {
        ageModal.style.display = 'none';
        initializeApp();
    }

    confirmAge.addEventListener('click', function() {
        localStorage.setItem('ageVerified', 'true');
        ageModal.style.display = 'none';
        initializeApp();
    });

    denyAge.addEventListener('click', function() {
        alert('You must be 21 or older to access this website.');
        window.location.href = 'https://www.google.com';
    });
});

function initializeApp() {
    // Load products
    displayProducts(liquors);
    
    // Setup event listeners
    setupEventListeners();
    
    // Load cart from localStorage
    loadCart();
    
    // Update cart count
    updateCartCount();
}

function setupEventListeners() {
    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            filterProducts(filter);
        });
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    
    searchInput.addEventListener('input', handleSearch);
    searchBtn.addEventListener('click', handleSearch);

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Authentication form handlers
    setupAuthEventListeners();
}

function setupAuthEventListeners() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', handleLogin);
    
    // Signup form
    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', handleSignup);
    
    // Close modal when clicking outside
    const authModal = document.getElementById('authModal');
    authModal.addEventListener('click', function(e) {
        if (e.target === authModal) {
            closeAuthModal();
        }
    });
}

function displayProducts(products) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-category', product.category);
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <div class="product-badge">${product.badge}</div>
        </div>
        <div class="product-info">
            <div class="product-category">${product.category}</div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">NPR ${product.price.toLocaleString()}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `;
    
    return card;
}

function filterProducts(category) {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productName = card.querySelector('.product-name').textContent.toLowerCase();
        const productDescription = card.querySelector('.product-description').textContent.toLowerCase();
        const productCategory = card.querySelector('.product-category').textContent.toLowerCase();
        
        if (productName.includes(searchTerm) || 
            productDescription.includes(searchTerm) || 
            productCategory.includes(searchTerm)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
    
    // Reset filter buttons
      document.querySelectorAll('.form-input').forEach ((input, index, inputs) => {
         input.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowDown') {
                e.preventDefault(); //prevent cursor movement
                if (index + 1 < inputs.length ) {
                    inputs[index + 1].focus();
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (index > 0) {
                    inputs[index - 1].focus();
                }
            }    
         }); 
    });

    document.querySelector('.filter-input[data-filter="all"]').classList.add('active');
}

function addToCart(productId) {
    const product = liquors.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    saveCart();
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    updateCartCount();
    saveCart();
}

function updateCartItemQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartDisplay();
        updateCartCount();
        saveCart();
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        cartTotal.textContent = '0';
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">NPR ${item.price.toLocaleString()}</div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="updateCartItemQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateCartItemQuantity(${item.id}, 1)">+</button>
                    <button class="qty-btn" onclick="removeFromCart(${item.id})" style="background: #dc3545; margin-left: 10px;">×</button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = total.toLocaleString();
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('active');
    
    if (cartSidebar.classList.contains('open')) {
        updateCartDisplay();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function scrollToProducts() {
    document.getElementById('products').scrollIntoView({
        behavior: 'smooth'
    });
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Close cart when clicking outside
document.addEventListener('click', function(e) {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartBtn = document.querySelector('.cart-btn');
    
    if (cartSidebar.classList.contains('open') && 
        !cartSidebar.contains(e.target) && 
        !cartBtn.contains(e.target)) {
        toggleCart();
    }
});

// Checkout functionality
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('checkout-btn')) {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        alert(`Thank you for your order! Total: NPR ${total.toLocaleString()}\n\nWe will contact you soon for delivery details.`);
        
        // Clear cart
        cart = [];
        updateCartCount();
        updateCartDisplay();
        saveCart();
        toggleCart();
    }
});

// Authentication Functions
function showAuthModal(mode) {
    const authModal = document.getElementById('authModal');
    const authTitle = document.getElementById('authTitle');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    // Clear any previous error messages
    clearFormErrors();
    
    if (mode === 'login') {
        authTitle.textContent = 'Login';
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        loginForm.reset();
    } else {
        authTitle.textContent = 'Create Account';
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        signupForm.reset();
    }
    
    authModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
    const authModal = document.getElementById('authModal');
    authModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    clearFormErrors();
}

function switchAuthMode(mode) {
    showAuthModal(mode);
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Clear previous errors
    clearFormErrors();
    
    // Basic validation
    if (!validateEmail(email)) {
        showFieldError('loginEmail', 'Please enter a valid email address');
        return;
    }
    
    if (password.length < 6) {
        showFieldError('loginPassword', 'Password must be at least 6 characters');
        return;
    }
    
    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Login successful
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        updateAuthUI();
        closeAuthModal();
        showNotification(`Welcome back, ${user.name}!`);
    } else {
        showFieldError('loginPassword', 'Invalid email or password');
    }
}

function handleSignup(e) {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const phone = document.getElementById('signupPhone').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    // Clear previous errors
    clearFormErrors();
    
    let hasErrors = false;
    
    // Validation
    if (name.length < 2) {
        showFieldError('signupName', 'Name must be at least 2 characters');
        hasErrors = true;
    }
    
    if (!validateEmail(email)) {
        showFieldError('signupEmail', 'Please enter a valid email address');
        hasErrors = true;
    }
    
    if (!validatePhone(phone)) {
        showFieldError('signupPhone', 'Please enter a valid phone number');
        hasErrors = true;
    }
    
    if (password.length < 6) {
        showFieldError('signupPassword', 'Password must be at least 6 characters');
        hasErrors = true;
    }
    
    if (password !== confirmPassword) {
        showFieldError('confirmPassword', 'Passwords do not match');
        hasErrors = true;
    }
    
    if (!agreeTerms) {
        showFieldError('agreeTerms', 'You must agree to the terms and conditions');
        hasErrors = true;
    }
    
    if (hasErrors) return;
    
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) {
        showFieldError('signupEmail', 'An account with this email already exists');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        name,
        email,
        phone,
        password,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto login
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    updateAuthUI();
    closeAuthModal();
    showNotification(`Welcome to Royal Liquor, ${newUser.name}!`);
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthUI();
    showNotification('You have been logged out successfully');
}

function loadUserSession() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateAuthUI();
    }
}

function updateAuthUI() {
    const authButtons = document.querySelector('.auth-buttons .login-btn').parentElement;
    const userMenu = document.getElementById('userMenu');
    const userName = document.getElementById('userName');
    
    if (currentUser) {
        // Hide auth buttons, show user menu
        authButtons.querySelector('.login-btn').style.display = 'none';
        authButtons.querySelector('.signup-btn').style.display = 'none';
        userMenu.style.display = 'flex';
        userName.textContent = `Hello, ${currentUser.name}`;
    } else {
        // Show auth buttons, hide user menu
        authButtons.querySelector('.login-btn').style.display = 'inline-block';
        authButtons.querySelector('.signup-btn').style.display = 'inline-block';
        userMenu.style.display = 'none';
    }
}

// Validation Functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    field.parentElement.appendChild(errorElement);
}

function clearFormErrors() {
    // Remove error classes
    document.querySelectorAll('.form-group input.error').forEach(input => {
        input.classList.remove('error');
    });
    
    // Remove error messages
    document.querySelectorAll('.error-message').forEach(error => {
        error.remove();
    });
    
    // Remove success messages
    document.querySelectorAll('.success-message').forEach(success => {
        success.remove();
    });
}

// Arrow key navigation for sign-up form
function attachArrowKeyNavigation() {
    const inputs = document.querySelectorAll('#signupForm.form-input');
    inputs.forEach((input, index) => {
        input.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (index + 1 < inputs.length) {
                    inputs[index + 1].focus();
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (index > 0) {
                    inputs[index - 1].focus();
                }
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    attachArrowKeyNavigation();
});

//Also run after page load in case modal is alreday visible
document.addEventListener('DOMContentLoaded', () => {
    attachArrowKeyNavigation();
});