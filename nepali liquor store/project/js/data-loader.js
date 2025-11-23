/**
 * Data Loader Utility for Royal Liquor Store
 * Handles loading and validation of JSON data files
 */

class DataLoader {
    constructor() {
        this.cache = new Map();
        this.basePath = '';
    }

    /**
     * Set the base path for data files
     * @param {string} path - Base path to data files
     */
    setBasePath(path) {
        this.basePath = path;
    }

    /**
     * Load a JSON file with caching
     * @param {string} filePath - Path to the JSON file
     * @returns {Promise<Object>} - Parsed JSON data
     */
    async loadJSON(filePath) {
        const fullPath = this.basePath + filePath;
        
        // Check cache first
        if (this.cache.has(fullPath)) {
            return this.cache.get(fullPath);
        }

        try {
            const response = await fetch(fullPath);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Cache the result
            this.cache.set(fullPath, data);
            
            return data;
        } catch (error) {
            console.error(`Error loading ${filePath}:`, error);
            throw error;
        }
    }

    /**
     * Load all application data files
     * @returns {Promise<Object>} - Object containing all loaded data
     */
    async loadAllData() {
        try {
            const [productsData, usersData, ordersData, configData] = await Promise.all([
                this.loadJSON('data/products.json'),
                this.loadJSON('data/users.json'),
                this.loadJSON('data/orders.json'),
                this.loadJSON('config/app-config.json')
            ]);

            return {
                products: productsData,
                users: usersData,
                orders: ordersData,
                config: configData
            };
        } catch (error) {
            console.error('Error loading application data:', error);
            throw error;
        }
    }

    /**
     * Validate product data structure
     * @param {Object} product - Product object to validate
     * @returns {boolean} - True if valid, false otherwise
     */
    validateProduct(product) {
        const requiredFields = ['id', 'name', 'category', 'price', 'image', 'description'];
        
        for (const field of requiredFields) {
            if (!product.hasOwnProperty(field)) {
                console.error(`Product validation failed: Missing field '${field}'`);
                return false;
            }
        }

        if (typeof product.price !== 'number' || product.price <= 0) {
            console.error('Product validation failed: Invalid price');
            return false;
        }

        return true;
    }

    /**
     * Validate user data structure
     * @param {Object} user - User object to validate
     * @returns {boolean} - True if valid, false otherwise
     */
    validateUser(user) {
        const requiredFields = ['id', 'name', 'email', 'phone'];
        
        for (const field of requiredFields) {
            if (!user.hasOwnProperty(field)) {
                console.error(`User validation failed: Missing field '${field}'`);
                return false;
            }
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(user.email)) {
            console.error('User validation failed: Invalid email format');
            return false;
        }

        return true;
    }

    /**
     * Validate order data structure
     * @param {Object} order - Order object to validate
     * @returns {boolean} - True if valid, false otherwise
     */
    validateOrder(order) {
        const requiredFields = ['id', 'userId', 'customerName', 'customerEmail', 'items', 'total'];
        
        for (const field of requiredFields) {
            if (!order.hasOwnProperty(field)) {
                console.error(`Order validation failed: Missing field '${field}'`);
                return false;
            }
        }

        if (!Array.isArray(order.items) || order.items.length === 0) {
            console.error('Order validation failed: Invalid items array');
            return false;
        }

        if (typeof order.total !== 'number' || order.total <= 0) {
            console.error('Order validation failed: Invalid total amount');
            return false;
        }

        return true;
    }

    /**
     * Get products by category
     * @param {Array} products - Array of products
     * @param {string} category - Category to filter by
     * @returns {Array} - Filtered products
     */
    getProductsByCategory(products, category) {
        if (category === 'all') {
            return products;
        }
        return products.filter(product => product.category === category);
    }

    /**
     * Search products by query
     * @param {Array} products - Array of products
     * @param {string} query - Search query
     * @param {Array} searchFields - Fields to search in
     * @returns {Array} - Filtered products
     */
    searchProducts(products, query, searchFields = ['name', 'description', 'category', 'badge']) {
        if (!query || query.trim().length < 2) {
            return products;
        }

        const searchTerm = query.toLowerCase().trim();
        
        return products.filter(product => {
            return searchFields.some(field => {
                const value = product[field];
                if (value && typeof value === 'string') {
                    return value.toLowerCase().includes(searchTerm);
                }
                return false;
            });
        });
    }

    /**
     * Get products by price range
     * @param {Array} products - Array of products
     * @param {number} minPrice - Minimum price
     * @param {number} maxPrice - Maximum price
     * @returns {Array} - Filtered products
     */
    getProductsByPriceRange(products, minPrice, maxPrice) {
        return products.filter(product => {
            const price = product.price;
            if (maxPrice === null) {
                return price >= minPrice;
            }
            return price >= minPrice && price <= maxPrice;
        });
    }

    /**
     * Clear the cache
     */
    clearCache() {
        this.cache.clear();
    }

    /**
     * Get cache statistics
     * @returns {Object} - Cache statistics
     */
    getCacheStats() {
        return {
            size: this.cache.size,
            keys: Array.from(this.cache.keys())
        };
    }
}

// Create a global instance
const dataLoader = new DataLoader();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DataLoader, dataLoader };
} else {
    // Make available globally for browser use
    window.DataLoader = DataLoader;
    window.dataLoader = dataLoader;
}
