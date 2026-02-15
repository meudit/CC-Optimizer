# 💳 Credit Card Points Optimizer

A modern, minimal web application to optimize your credit card points usage and maximize rewards efficiency.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 🌟 Features

- **Smart Optimization**: Automatically calculates the optimal points to use for any purchase
- **Multiple Cards**: Support for unlimited credit cards with different reward structures
- **Perfect Balance**: Find solutions where points earned equals points spent
- **Modern UI**: Beautiful, minimal design with glassmorphism effects
- **Dark Mode**: Seamless dark/light theme switching
- **Mobile Responsive**: Works perfectly on all devices
- **Offline Storage**: All data saved locally in your browser
- **No Backend**: Pure client-side application, completely private

## 🚀 Live Demo

Visit the live application: [Credit Card Points Optimizer](https://yourusername.github.io/credit-card-optimizer/)

## 📱 Screenshots

> **Note**: After opening the application, you can take screenshots of the light and dark modes to add here. Simply open `index.html` in your browser, test the features, and capture screenshots to showcase the design.

## 🎯 How It Works

The optimizer uses a smart algorithm to find the perfect points usage:

1. **Input**: Enter the item price you want to purchase
2. **Calculate**: The app finds how many points to redeem
3. **Optimize**: Ensures you earn back equal or more points than you use
4. **Save**: Get the best value from your credit card rewards

### Example

For a ₹6,000 item with a card earning 25 points per ₹150:
- **Use**: 850 points
- **Pay**: ₹5,150
- **Earn Back**: 850 points
- **Result**: Perfect optimization! 🎯

## 🛠️ Technology Stack

- **HTML5**: Semantic markup for accessibility
- **CSS3**: Modern design with CSS variables, glassmorphism, and animations
- **Vanilla JavaScript**: No frameworks, pure performance
- **LocalStorage**: Client-side data persistence

## 📦 Installation

### Option 1: Use Directly
Simply open `index.html` in your browser. No installation needed!

### Option 2: Local Server
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

### Option 3: Deploy to GitHub Pages

1. Fork this repository
2. Go to Settings → Pages
3. Select `main` branch as source
4. Your site will be live at `https://yourusername.github.io/credit-card-optimizer/`

## 💡 Usage

### Adding a Credit Card

1. Click the "Add Card" button
2. Enter card details:
   - **Card Name**: Your card identifier
   - **Spend Required**: Amount needed to earn points (e.g., ₹150)
   - **Points Earned**: Points earned per spend threshold (e.g., 25)
   - **Point Value**: Rupee value of each point (e.g., ₹1)
3. Click "Save Card"

### Calculating Optimal Points

1. Select your credit card from the list
2. Enter the item price
3. View the optimization results instantly
4. See exactly how many points to use for maximum efficiency

### Managing Cards

- **Edit**: Click the ✏️ icon to modify card details
- **Delete**: Click the 🗑️ icon to remove a card
- **Select**: Click on any card to use it for calculations

## 🎨 Design Philosophy

- **Minimal**: Clean interface with plenty of white space
- **Modern**: Glassmorphism, gradients, and smooth animations
- **Accessible**: Proper contrast ratios and keyboard navigation
- **Responsive**: Mobile-first design that scales beautifully
- **Premium**: Curated color palette and typography

## 🔒 Privacy

All your data is stored locally in your browser using LocalStorage. Nothing is sent to any server. Your credit card information never leaves your device.

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the need to maximize credit card rewards
- Built with modern web technologies
- Designed for real-world usage

## 📧 Contact

Have questions or suggestions? Feel free to open an issue!

---

Made with ❤️ for smart credit card users
