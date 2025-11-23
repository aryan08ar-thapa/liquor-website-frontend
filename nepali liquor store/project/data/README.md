# Data Files Documentation

This directory contains JSON data files for the Royal Liquor Store project. These files store structured data that can be easily managed and updated without modifying the main application code.

## File Structure

```
data/
├── products.json      # Product catalog and store information
├── users.json         # User accounts and authentication data
├── orders.json        # Order history and status definitions
└── README.md          # This documentation file

config/
└── app-config.json    # Application configuration and settings
```

## Files Description

### 1. `products.json`
Contains the complete product catalog and store information.

**Structure:**
- `products`: Array of product objects with details like name, price, category, etc.
- `categories`: Available product categories for filtering
- `storeInfo`: Store details including contact information and features

**Usage:**
```javascript
// Load products data
fetch('data/products.json')
  .then(response => response.json())
  .then(data => {
    const products = data.products;
    const categories = data.categories;
    const storeInfo = data.storeInfo;
  });
```

### 2. `users.json`
Contains user account information and authentication data.

**Structure:**
- `users`: Array of user objects with profile and order history
- `userRoles`: Available user roles and permissions
- `userStatuses`: User account status definitions

**Usage:**
```javascript
// Load user data
fetch('data/users.json')
  .then(response => response.json())
  .then(data => {
    const users = data.users;
    const roles = data.userRoles;
  });
```

### 3. `orders.json`
Contains order history and related configuration data.

**Structure:**
- `orders`: Array of order objects with complete order details
- `orderStatuses`: Available order status definitions
- `paymentMethods`: Available payment methods
- `paymentStatuses`: Payment status definitions

**Usage:**
```javascript
// Load orders data
fetch('data/orders.json')
  .then(response => response.json())
  .then(data => {
    const orders = data.orders;
    const statuses = data.orderStatuses;
  });
```

### 4. `app-config.json`
Contains application-wide configuration settings.

**Structure:**
- `app`: Basic application information
- `ageVerification`: Age verification settings
- `cart`: Shopping cart configuration
- `search`: Search functionality settings
- `filters`: Product filtering options
- `delivery`: Delivery settings and areas
- `contact`: Contact information
- `businessHours`: Store operating hours
- `features`: Feature flags
- `ui`: User interface settings

**Usage:**
```javascript
// Load application configuration
fetch('config/app-config.json')
  .then(response => response.json())
  .then(config => {
    const appName = config.app.name;
    const currency = config.app.currency;
    const minAge = config.ageVerification.minimumAge;
  });
```

## Data Management

### Adding New Products
1. Open `products.json`
2. Add a new product object to the `products` array
3. Ensure the product has all required fields:
   - `id`: Unique identifier
   - `name`: Product name
   - `category`: Product category (must match existing categories)
   - `price`: Product price in NPR
   - `image`: Path to product image
   - `description`: Product description
   - `badge`: Product badge (optional)

### Adding New Users
1. Open `users.json`
2. Add a new user object to the `users` array
3. Include required fields:
   - `id`: Unique user ID
   - `name`: Full name
   - `email`: Email address
   - `phone`: Phone number
   - `password`: Hashed password (in production, use proper hashing)
   - `address`: Delivery address
   - `preferences`: User preferences

### Managing Orders
1. Open `orders.json`
2. Add new orders to the `orders` array
3. Update order statuses as needed
4. Include all required order information

## Best Practices

1. **Data Validation**: Always validate JSON data before using it in the application
2. **Backup**: Keep regular backups of these data files
3. **Version Control**: Use version control to track changes to data files
4. **Security**: In production, never store sensitive data like passwords in plain text
5. **Performance**: Consider using a database for larger datasets instead of JSON files

## Integration with JavaScript

To integrate these JSON files with your existing JavaScript code:

1. **Replace hardcoded data**: Update `script.js` to load data from JSON files instead of using hardcoded arrays
2. **Add error handling**: Implement proper error handling for JSON loading
3. **Caching**: Consider implementing caching for better performance
4. **Real-time updates**: For dynamic data, consider using a backend API instead of static JSON files

## Example Integration

```javascript
// Load all data files on page load
async function loadAppData() {
  try {
    const [productsData, usersData, ordersData, configData] = await Promise.all([
      fetch('data/products.json').then(r => r.json()),
      fetch('data/users.json').then(r => r.json()),
      fetch('data/orders.json').then(r => r.json()),
      fetch('config/app-config.json').then(r => r.json())
    ]);
    
    // Initialize application with loaded data
    initializeApp(productsData, usersData, ordersData, configData);
  } catch (error) {
    console.error('Error loading application data:', error);
  }
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', loadAppData);
```

## Notes

- These JSON files are currently static and suitable for development/demo purposes
- For production use, consider implementing a proper backend API
- Always validate and sanitize data before using it in the application
- Keep the JSON structure consistent across all files
