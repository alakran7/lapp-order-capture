# LAPP OrderCapture Pro 🚀

A high-performance, mobile-first web application designed for industrial sales teams to capture orders on-the-go. 

## ✨ Features
- **Smart Camera Integration**: Native browser camera access with automatic fallback constraints for maximum device compatibility.
- **Simulation Mode**: Test the full workflow on laptops or devices without a back-facing camera.
- **Real-time Order Management**: Dynamic cart with quantity adjustments and instant total calculations.
- **Industrial Design System**: Clean, high-contrast UI tailored for warehouse and industrial environments.
- **Dark Mode Support**: Seamlessly switch between light and dark themes for different lighting conditions.

## 🛠️ Technology Stack
- **React 19**: Modern UI development using Functional Components and Hooks.
- **Tailwind CSS**: Utility-first styling for a highly responsive, polished interface.
- **Google Material Symbols**: High-quality, recognizable industrial iconography.
- **ES Modules**: Pure JavaScript implementation—no complex build steps required for local testing.

## 🚀 Quick Start (Local Setup)

Since this app uses Modern ES Modules, it must be served through a local web server to bypass browser security (CORS) restrictions.

### Option 1: VS Code (Easiest)
1. Install the **Live Server** extension.
2. Open this folder in VS Code.
3. Right-click `index.html` and select **"Open with Live Server"**.

### Option 2: Node.js
If you have Node.js installed, run:
```bash
npx serve .
```

### Option 3: Python
```bash
python -m http.server 8000
```

## 📱 Mobile Testing
To test on a real smartphone:
1. Ensure your phone and laptop are on the same Wi-Fi.
2. Find your laptop's local IP address (e.g., `192.168.1.50`).
3. Open `http://192.168.1.50:8000` on your mobile browser.

## 📂 Project Structure
- `App.tsx`: Main application logic and state management.
- `views/`: Contains individual screens (Login, Dashboard, Scanner, etc.).
- `constants.ts`: Mock product data for testing.
- `types.ts`: TypeScript interfaces for the data model.

---
*Created for LAPP industrial sales efficiency.*
