# 💳 Credit Card Points Optimizer

A modern, minimal web application to optimize your credit card points usage and maximize rewards efficiency.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 🌟 Features

### Core Functionality
- **Smart Optimization**: Automatically calculates the optimal points to use for any purchase
- **Perfect Balance**: Find solutions where points earned equals points spent
- **Multiple Cards**: Support for unlimited credit cards with different reward structures
- **Custom Point Values**: Set different redemption values per card (e.g., 0.25, 0.5, 1 rupee per point)
- **Points Multiplier**: Apply 2x, 5x, or 10x multipliers for bonus categories (dining, travel, etc.)

### User Experience
- **Modern UI**: Clean, minimal design with angular elements and tight spacing
- **Horizontal Card Carousel**: Swipe through your cards with smooth scrolling
- **Inline Card Management**: Add new cards directly from the carousel
- **Dark Mode**: Seamless dark/light theme switching with persistent preference
- **Mobile Responsive**: Optimized for all screen sizes
- **Minimal Flat Icons**: Clean SVG icons throughout
- **PWA Support**: Install as a native app on any device
- **Offline Mode**: Works without internet connection after first load

### Technical
- **Offline Storage**: All data saved locally in your browser (LocalStorage)
- **No Backend**: Pure client-side application, completely private
- **Zero Dependencies**: Built with vanilla HTML, CSS, and JavaScript
- **Fast & Lightweight**: No frameworks, instant loading

## 🚀 Live Demo

Visit the live application: [Credit Card Points Optimizer](https://yourusername.github.io/credit-card-optimizer/)

## 🎯 How It Works

The optimizer uses a smart algorithm to find the perfect points usage:

1. **Select Card**: Choose from your saved credit cards
2. **Set Multiplier**: Apply bonus multipliers (1x, 2x, 5x, 10x) for special categories
3. **Enter Price**: Input the item price you want to purchase
4. **Calculate**: The app finds how many points to redeem
5. **Optimize**: Ensures you earn back equal or more points than you use

### Example

**Scenario**: ₹6,000 purchase with HDFC Regalia Gold
- **Card**: 25 points per ₹150, 1 point = ₹1
- **Multiplier**: 5x (dining category)
- **Optimal Solution**:
  - Use: 850 points
  - Pay: ₹5,150
  - Earn Back: 850 points (with 5x multiplier)
  - Result: Perfect optimization! 🎯

## 🛠️ Technology Stack

- **HTML5**: Semantic markup for accessibility
- **CSS3**: Modern design with CSS variables, minimal styling, and smooth animations
- **Vanilla JavaScript**: No frameworks, pure performance
- **LocalStorage**: Client-side data persistence
- **Google Fonts**: Outfit (body) and Space Grotesk (headings)

## 📦 Installation & Deployment

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

### Option 3: Install as PWA

This app is a Progressive Web App! You can install it on your device:

**On Desktop (Chrome/Edge):**
1. Visit the live site or run locally
2. Click the install icon in the address bar
3. Or go to Settings → Install app

**On Mobile (iOS/Android):**
1. Open in Safari (iOS) or Chrome (Android)
2. Tap Share → Add to Home Screen
3. The app will work offline!

**Features:**
- ✅ Works offline after first load
- ✅ Install on home screen
- ✅ Native app-like experience
- ✅ Fast loading with service worker caching

### Option 4: Deploy to GitHub Pages

1. Fork or clone this repository
2. Create a `.nojekyll` file in the root (already included)
3. Push to GitHub
4. Go to Settings → Pages
5. Select `main` branch as source
6. Your site will be live at `https://yourusername.github.io/credit-card-optimizer/`

**Important**: The `.nojekyll` file is required to prevent GitHub Pages from using Jekyll, which can interfere with CSS/JS loading.

## 💡 Usage Guide

### Adding a Credit Card

1. Click the "Add Card" button in the carousel or header menu
2. Fill in the card details:
   - **Bank Name**: e.g., "HDFC Bank"
   - **Card Name**: e.g., "Regalia Gold"
   - **Points Earned**: Points earned per spend threshold (e.g., 25)
   - **Per ₹ Spend**: Amount needed to earn points (e.g., 150)
   - **Point Value (₹)**: Rupee value of each point when redeemed (e.g., 1, 0.5, 0.25)
   - **Color**: Choose from 10 vibrant colors to identify your card
3. Click "Save Card"

### Calculating Optimal Points

1. Select your credit card from the horizontal carousel
2. Choose a multiplier (1x, 2x, 5x, 10x) based on the category
3. Enter the item price
4. Click "Calculate Optimal Points"
5. View detailed results showing:
   - Points to use
   - Final price after redemption
   - Points earned back (with multiplier)
   - Net points change
   - Perfect solution indicator (if applicable)

### Managing Cards

- **Edit**: Click the edit icon in the "Manage Cards" modal
- **Delete**: Click the delete icon (requires at least one card)
- **Select**: Click on any card in the carousel to use it
- **Add**: Click the dashed "Add Card" button in the carousel

## 🎨 Design Philosophy

- **Minimal & Clean**: Reduced spacing, angular corners, compact layout
- **Modern**: Horizontal scrolling, vibrant colors, smooth transitions
- **Accessible**: Proper contrast ratios, semantic HTML, keyboard navigation
- **Responsive**: Mobile-first design that scales beautifully
- **Premium**: Curated color palette and professional typography

### Typography
- **Body**: Outfit - Modern, rounded, highly readable
- **Headings**: Space Grotesk - Distinctive geometric design

### Color System
10 vibrant card colors: Blue, Red, Green, Orange, Purple, Pink, Cyan, Lime, Orange-Red, Violet

## 🔒 Privacy & Security

- **100% Local**: All data stored in browser LocalStorage
- **No Tracking**: No analytics, cookies, or external requests
- **No Backend**: Pure client-side application
- **Your Data**: Never leaves your device

## 🧮 Algorithm Details

The optimization algorithm:
1. Iterates through possible point redemption amounts
2. Calculates points earned for each scenario (with multiplier)
3. Finds the minimum difference where `points_earned >= points_used`
4. Returns the optimal solution with the best balance

```javascript
pointsEarned = floor(finalPrice / spendPerPoint) * pointsPerSpend * multiplier
```

## 📱 Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs via Issues
- Suggest new features
- Submit pull requests
- Improve documentation
- Share your use cases

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the need to maximize credit card rewards
- Built with modern web technologies
- Designed for real-world usage
- Community feedback and suggestions

## 📧 Support

Have questions or suggestions? Feel free to open an issue on GitHub!

---

**Made with ❤️ for smart credit card users**

*Optimize smarter, save more, earn better rewards!*
