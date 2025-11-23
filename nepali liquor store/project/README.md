# 🍷 Royal Liquor Store

Premium Nepali Liquor Store - Royal Nepali Spirits

A modern, responsive e-commerce website for a premium liquor store in Nepalgunj, Nepal.

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation & Setup

1. **Clone or download the project**
   ```bash
   # If you have the project files, navigate to the project directory
   cd "New folder/nepali liquor store/project"
   ```

2. **Install dependencies (if any)**
   ```bash
   npm install
   ```

3. **Start the local server**
   ```bash
   npm start
   # or
   node server.js
   ```

4. **Open your browser**
   - Go to: `http://localhost:3000`
   - Your website is now running on localhost! 🎉

## 📁 Project Structure

```
project/
├── index.html              # Main HTML file
├── styles.css              # CSS styles
├── script.js               # Main JavaScript file
├── server.js               # Local development server
├── package.json            # Project configuration
├── README.md               # This file
├── data/                   # JSON data files
│   ├── products.json       # Product catalog
│   ├── users.json          # User data
│   ├── orders.json         # Order data
│   └── README.md           # Data documentation
├── config/                 # Configuration files
│   └── app-config.json     # App settings
├── js/                     # JavaScript utilities
│   ├── data-loader.js      # JSON data loader
│   └── integration-example.js # Integration example
└── images/                 # Product images
    ├── khukurirum.png
    ├── olddurbar.png
    └── ... (other images)
```

## 🌐 Running on Localhost

### Method 1: Using the Node.js Server (Recommended)
```bash
# Navigate to project directory
cd "New folder/nepali liquor store/project"

# Start the server
npm start
```

### Method 2: Using Python (Alternative)
If you have Python installed:
```bash
# Python 3
python -m http.server 3000

# Python 2
python -m SimpleHTTPServer 3000
```

### Method 3: Using Live Server (VS Code Extension)
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Method 4: Direct File Opening
- Simply double-click `index.html` to open in your browser
- Note: Some features may not work due to CORS restrictions

## 🔧 Available Scripts

- `npm start` - Start the development server
- `npm run dev` - Start the development server (alias)
- `npm run serve` - Start the development server (alias)

## 🌟 Features

### ✅ Implemented Features
- **Responsive Design** - Works on all devices
- **Age Verification** - 21+ age requirement
- **Product Catalog** - 20+ Nepali liquor products
- **Search & Filter** - Find products easily
- **Shopping Cart** - Add/remove items
- **User Authentication** - Login/Signup system
- **JSON Data Management** - Easy to update content
- **Local Storage** - Cart persistence

### 📱 Product Categories
- **Whisky** - Premium Nepali and international brands
- **Rum** - Authentic Nepali rums
- **Beer** - Local and imported beers
- **Vodka** - Premium vodka selections
- **Wine** - Red, white, and rosé wines

## 🛠️ Development

### Adding New Products
1. Open `data/products.json`
2. Add a new product object to the `products` array
3. Include all required fields: `id`, `name`, `category`, `price`, `image`, `description`

### Modifying Configuration
1. Open `config/app-config.json`
2. Update settings as needed
3. Changes will be reflected immediately

### Customizing Styles
1. Edit `styles.css` for visual changes
2. The design uses modern CSS with responsive breakpoints

## 🔒 Security Notes

- This is a frontend-only application for demonstration
- In production, implement proper backend security
- User authentication is simulated (no real backend)
- Always validate data on both client and server side

## 🌍 Deployment

### Local Development
- Perfect for development and testing
- All features work locally
- JSON data is loaded from local files

### Production Deployment
For production deployment, consider:
1. **Static Hosting** - Netlify, Vercel, GitHub Pages
2. **Backend API** - Node.js, Python, PHP
3. **Database** - MongoDB, PostgreSQL, MySQL
4. **CDN** - For images and static assets

## 📞 Support

If you encounter any issues:

1. **Check the console** - Open browser developer tools (F12)
2. **Verify Node.js version** - Should be 14 or higher
3. **Check file paths** - Ensure all files are in the correct locations
4. **Port conflicts** - If port 3000 is busy, change it in `server.js`

## 🎯 Next Steps

1. **Add more products** - Expand the product catalog
2. **Implement backend** - Add real authentication and database
3. **Payment integration** - Add payment gateways
4. **Admin panel** - Create management interface
5. **Mobile app** - Develop native mobile application

## 📄 License

This project is licensed under the MIT License.

---

**🍷 Royal Liquor Store** - Premium Nepali Spirits since 2000

*M.P.road, Nepalgunj, Nepal*
*Phone: +977-1-4234567*
*Email: info@royalliquorstore.com*
