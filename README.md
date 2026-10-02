# 🛒 Amazon India (Amazon.in) – Great Indian Festival Edition

A modern, responsive, and interactive **Amazon India (`amazon.in`)** e-commerce web application built using **React**, **Vite**, **Lucide Icons**, and custom CSS. This clone features authentic Indian store localization (Rupee pricing, UPI payments, No Cost EMI, Great Indian Festival theme) alongside unique elements like **Rufus AI Shopping Genie** and **Diwali Spin & Win Jackpot Lucky Wheel**.

---

## 🌟 Key Highlights & Unique Features

### 1. 🤖 Rufus AI India – Smart Shopping & Bargain Assistant
- Interactive floating shopping assistant widget.
- **Smart Recommendations**: Instant comparisons (e.g., *OnePlus 12 vs. iPhone 16 Pro*), festival gift ideas under ₹1,000, and secret VIP discount codes (`RUFUSVIP10`).
- **In-Chat Product Cards**: View products and add items directly to your cart from inside the AI chat.

### 2. 🎰 Diwali Spin & Win Jackpot Wheel
- Interactive rotating prize wheel with smooth rotational physics.
- **Win Instant Rewards**: Win ₹500 Amazon Pay Cashback, 20% discounts, ₹1,000 vouchers, or 1-Month Free Prime.
- **Confetti Explosion** upon winning with automatic coupon application to your checkout subtotal.

### 3. 🇮🇳 Indian E-Commerce Localization (`₹ INR`)
- **Rupee Pricing & Tax Inclusion**: Formatted across all products, lightning deals, and cart subtotals.
- **No-Cost EMI & Bank Offers**: Real-time EMI calculation across Bajaj Finserv, HDFC, ICICI, and SBI Bank credit cards.
- **Indian Product Catalog**: OnePlus, boAt, Noise, Prestige, Manyavar, Suta Handloom, Cadbury Celebrations, and Tata Tea.
- **Language Toggle**: One-click switch between **English** and **हिन्दी (Hindi)**.
- **Delivery PIN Code Selector**: Deliveries mapped to Indian PIN codes & cities (Bengaluru, Mumbai, Delhi, etc.).

### 4. 💳 Multi-Mode Indian Checkout & UPI
- **UPI Express Checkout**: Support for Google Pay, PhonePe, Paytm, BHIM, and Amazon Pay UPI with instant verification.
- **RuPay / Credit / Debit Cards** with No-Cost EMI.
- **Cash on Delivery (COD)** support.
- **Confetti Celebration Animation** upon placing orders with auto-generated order IDs and tracking references.

### 5. 📦 Orders & Live Package Tracking
- Orders history modal with order status badges (*Ordered*, *Shipped*, *Out for Delivery*, *Delivered*).
- **"Buy It Again"** 1-click reorder feature and simulated invoice previews.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations & Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Styling**: Vanilla CSS Design Tokens (Custom Amazon UI Design System)
- **State Management**: React Context API (`ShopContext`) with `localStorage` persistence

---

## 📁 Project Structure

```
amazon/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── context/
    │   └── ShopContext.jsx          # Cart, Wishlist, User, Orders & Coupon State
    ├── data/
    │   └── products.js              # Indian Products, Deals, Slides & Prizes
    └── components/
        ├── Navbar.jsx               # Amazon.in Header with Search, Delivery Pin & Cart
        ├── CategoryDrawer.jsx       # "All" Slide-out Navigation Drawer
        ├── HeroCarousel.jsx         # Festive Hero Banner Slider
        ├── CategoryCardGrid.jsx     # 4-in-1 Department Cards Grid
        ├── LightningDeals.jsx       # Live Countdown Deals with % Claimed Progress
        ├── ProductCard.jsx          # Indian Rupee Card with Star Ratings & Prime Badge
        ├── ProductDetailModal.jsx   # Multi-image Gallery, Specs & Sticky Buy Box
        ├── CartDrawer.jsx           # Quantity Stepper, Coupon Input & Free Delivery Bar
        ├── CheckoutModal.jsx        # 3-Step UPI / RuPay / COD Checkout with Confetti
        ├── OrderHistoryModal.jsx    # Delivery Timeline Tracker & Past Invoices
        ├── SpinAndWinModal.jsx      # Diwali Jackpot Lucky Wheel
        ├── AIAssistant.jsx          # Rufus AI India Shopping Genie
        ├── WishlistView.jsx         # Saved Wishlist Items
        ├── SearchResultsView.jsx    # Department Filters, Ratings & Price Sliders
        ├── DealsView.jsx            # Today's Lightning Deals Hub
        ├── PrimeModal.jsx           # Prime India Perks & Video Showcase
        ├── AddressModal.jsx         # Indian PIN Code Selector
        ├── Toast.jsx                # Animated Notification Feedback
        └── Footer.jsx               # Multi-column Indian Navigation & Copyright
```

---

## ⚡ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18+ recommended)
- [Git](https://git-scm.com/)

### Installation & Local Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Yeshwanth-develops/Amazon-India.git
   cd Amazon-India
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173/`.

4. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 👤 Author
**Yeshwanth Sunkara**  
- GitHub: [@Yeshwanth-develops](https://github.com/Yeshwanth-develops)

---

## 📄 License
This project is built for educational and demonstration purposes. All Amazon brand assets, logos, and product trademarks belong to Amazon.com, Inc. or their respective owners.
