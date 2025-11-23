/**
 * Integration Example for Royal Liquor Store
 * Shows how to integrate JSON data files with the existing application
 */

// Example of how to integrate JSON data with your existing script.js
class RoyalLiquorStoreApp {
    constructor() {
        this.dataLoader = new DataLoader();
        this.products = [];
        this.categories = [];
        this.config = {};
        this.currentUser = null;
        this.cart = [];
    }

    /**
     * Initialize the application
     */
    async initialize() {
        try {
            console.log('Loading application data...');
            
            // Load all data files
            const data = await this.dataLoader.loadAllData();
            
            // Set up application data
            this.products = data.products.products;
            this.categories = data.products.categories;
            this.config = data.config;
            
            // Initialize the application
            this.setupEventListeners();
            this.displayProducts();
            this.setupFilters();
            this.setupSearch();
            
            console.log('Application initialized successfully!');
            
        } catch (error) {
            console.error('Failed to initialize application:', error);
            this.showErrorMessage('Failed to load application data. Please refresh the page.');
        }
    }

    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Age verification
        const confirmAgeBtn = document.getElementById('confirmAge');
        const denyAgeBtn = document.getElementById('denyAge');
        
        if (confirmAgeBtn) {
            confirmAgeBtn.addEventListener('click', () => this.handleAgeVerification(true));
        }
        
        if (denyAgeBtn) {
            denyAgeBtn.addEventListener('click', () => this.handleAgeVerification(false));
        }

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }

        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.handleFilter(filter);
            });
        });
    }

    /**
     * Handle age verification
     */
    handleAgeVerification(confirmed) {
        const ageModal = document.getElementById('ageModal');
        
        if (confirmed) {
            ageModal.style.display = 'none';
            localStorage.setItem('ageVerified', 'true');
        } else {
            // Redirect to a safe page or show message
            window.location.href = 'https://www.google.com';
        }
    }

    /**
     * Display products in the grid
     */
    displayProducts(productsToShow = this.products) {
        const productsGrid = document.getElementById('productsGrid');
        
        if (!productsGrid) {
            console.error('Products grid not found');
            return;
        }

        productsGrid.innerHTML = '';

        productsToShow.forEach(product => {
            const productCard = this.createProductCard(product);
            productsGrid.appendChild(productCard);
        });
    }

    /**
     * Create a product card element
     */
    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<span class="badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="description">${product.description}</p>
                <div class="product-footer">
                    <span class="price">₨${product.price.toLocaleString()}</span>
                    <button class="add-to-cart-btn" onclick="app.addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;

        return card;
    }

    /**
     * Set up filter functionality
     */
    setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove active class from all buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                e.target.classList.add('active');
                
                // Filter products
                const filter = e.target.dataset.filter;
                this.handleFilter(filter);
            });
        });
    }

    /**
     * Handle product filtering
     */
    handleFilter(category) {
        let filteredProducts;
        
        if (category === 'all') {
            filteredProducts = this.products;
        } else {
            filteredProducts = this.dataLoader.getProductsByCategory(this.products, category);
        }
        
        this.displayProducts(filteredProducts);
    }

    /**
     * Set up search functionality
     */
    setupSearch() {
        const searchInput = document.getElementById('searchInput');
        
        if (searchInput) {
            let searchTimeout;
            
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                
                searchTimeout = setTimeout(() => {
                    const query = e.target.value;
                    this.handleSearch(query);
                }, 300); // Debounce search
            });
        }
    }

    /**
     * Handle search
     */
    handleSearch(query) {
        if (!query || query.trim().length < this.config.search.minQueryLength) {
            this.displayProducts();
            return;
        }

        const searchFields = this.config.search.searchFields;
        const searchResults = this.dataLoader.searchProducts(this.products, query, searchFields);
        
        this.displayProducts(searchResults);
    }

    /**
     * Add product to cart
     */
    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        
        if (!product) {
            console.error('Product not found:', productId);
            return;
        }

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        this.updateCartDisplay();
        this.saveCartToStorage();
        this.showSuccessMessage(`${product.name} added to cart!`);
    }

    /**
     * Update cart display
     */
    updateCartDisplay() {
        const cartCount = document.getElementById('cartCount');
        const cartItems = document.getElementById('cartItems');
        
        if (cartCount) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }

        if (cartItems) {
            this.displayCartItems();
        }
    }

    /**
     * Display cart items
     */
    displayCartItems() {
        const cartItems = document.getElementById('cartItems');
        
        if (!cartItems) return;

        cartItems.innerHTML = '';

        this.cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>₨${item.price.toLocaleString()} x ${item.quantity}</p>
                </div>
                <div class="cart-item-actions">
                    <button onclick="app.updateCartQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="app.updateCartQuantity(${item.id}, 1)">+</button>
                    <button onclick="app.removeFromCart(${item.id})" class="remove-btn">×</button>
                </div>
            `;
            
            cartItems.appendChild(cartItem);
        });

        this.updateCartTotal();
    }

    /**
     * Update cart quantity
     */
    updateCartQuantity(productId, change) {
        const item = this.cart.find(item => item.id === productId);
        
        if (item) {
            item.quantity += change;
            
            if (item.quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                this.updateCartDisplay();
                this.saveCartToStorage();
            }
        }
    }

    /**
     * Remove item from cart
     */
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.updateCartDisplay();
        this.saveCartToStorage();
    }

    /**
     * Update cart total
     */
    updateCartTotal() {
        const cartTotal = document.getElementById('cartTotal');
        
        if (cartTotal) {
            const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotal.textContent = total.toLocaleString();
        }
    }

    /**
     * Save cart to localStorage
     */
    saveCartToStorage() {
        if (this.config.cart.saveToLocalStorage) {
            localStorage.setItem('royalLiquorCart', JSON.stringify(this.cart));
        }
    }

    /**
     * Load cart from localStorage
     */
    loadCartFromStorage() {
        if (this.config.cart.saveToLocalStorage) {
            const savedCart = localStorage.getItem('royalLiquorCart');
            if (savedCart) {
                try {
                    this.cart = JSON.parse(savedCart);
                    this.updateCartDisplay();
                } catch (error) {
                    console.error('Error loading cart from storage:', error);
                }
            }
        }
    }

    /**
     * Show success message
     */
    showSuccessMessage(message) {
        // You can implement a toast notification system here
        console.log('Success:', message);
    }

    /**
     * Show error message
     */
    showErrorMessage(message) {
        // You can implement a toast notification system here
        console.error('Error:', message);
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    // Check if age verification is required
    const ageVerified = localStorage.getItem('ageVerified');
    
    if (!ageVerified && window.dataLoader.config?.ageVerification?.required) {
        const ageModal = document.getElementById('ageModal');
        if (ageModal) {
            ageModal.style.display = 'flex';
        }
    }

    // Initialize the application
    window.app = new RoyalLiquorStoreApp();
    await window.app.initialize();
    
    // Load cart from storage
    window.app.loadCartFromStorage();
});

// Make the app available globally
window.RoyalLiquorStoreApp = RoyalLiquorStoreApp;
