# CraveFeed - Premium Food Delivery Application

## 1. Introduction
**CraveFeed** is a comprehensive, feature-rich React application designed for the Indian food delivery market. It integrates multiple verticals including **Restaurant Delivery, Dining Out, Quick Commerce (Grocery), and Food on Train**.

The application focuses on user experience with features like **AI-Powered Smart Search**, **Geolocation Detection**, **Dark Mode**, and **CraveFeed Gold** subscription.

---

## 2. Quick Start (VS Code)

### Prerequisites
1.  **Node.js**: Install from [nodejs.org](https://nodejs.org/).
2.  **VS Code**: Recommended code editor.

### Installation & Running
1.  **Open Terminal**: Press `Ctrl + ~` (tilde) in VS Code.
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
    *This downloads React, Parcel, and all required libraries.*

3.  **Start Development Server**:
    ```bash
    npm start
    ```
    *This command runs `parcel index.html`. It will start a local server (usually at http://localhost:1234) with Hot Module Replacement (HMR).*

4.  **Build for Production**:
    ```bash
    npm run build
    ```
    *This creates a `dist/` folder with optimized files ready for deployment.*

---

## 3. Parcel Specific Commands & Troubleshooting

Since this project uses **Parcel** as the bundler, here are the specific commands and tricks you might need:

### Standard Commands
*   **`npm start`**:
    *   **What it does:** Starts the development server.
    *   **When to use:** Every time you want to work on the code. It auto-updates the browser when you save a file.
    
*   **`npm run build`**:
    *   **What it does:** Minifies and bundles code for production.
    *   **When to use:** Only when you are ready to deploy the website to a server (e.g., Vercel, Netlify).

### Troubleshooting Parcel
If you see errors like "Entry not found" or weird caching issues, run this command:

*   **`npm run clean`** (Mac/Linux/Git Bash)
    *   *Or manually delete the `.parcel-cache` and `dist` folders.*
    *   Then run `npm start` again.

### Manual Parcel CLI
If you prefer running Parcel directly (without npm scripts), you can use `npx`:

```bash
# Start server
npx parcel index.html

# Build for production
npx parcel build index.html
```

---

## 4. Technology Stack
*   **Frontend:** React 18, TypeScript
*   **Build Tool:** Parcel
*   **Styling:** Tailwind CSS
*   **Routing:** React Router DOM
*   **State Management:** Context API
*   **AI:** Google Gemini API

---

## 5. System Design & Diagrams

### 5.1 Use Case Diagram
*Actors: User, AI Service, GPS Service*
*   **Sign Up / Login:** Authenticate user.
*   **Detect Location:** Use GPS/Manual entry to set city.
*   **Search Food (AI):** Semantic search for cravings.
*   **Toggle Veg Mode:** Filter for vegetarian options.
*   **Place Order:** Add to cart and pay.

```mermaid
usecaseDiagram
    actor User
    actor "AI Service" as AI
    actor "GPS Service" as GPS

    User --> (Login)
    User --> (Detect Location)
    User --> (Search Food)
    User --> (Place Order)
    (Detect Location) ..> GPS : Uses
    (Search Food) ..> AI : Uses
```

### 5.2 Sequence Flow (Ordering)
1.  **User** selects Restaurant -> Adds Items.
2.  **CartContext** updates state.
3.  **User** proceeds to Checkout.
4.  **User** applies Coupon -> System validates.
5.  **User** pays -> **System** saves Order to History.

### 5.3 Class Diagram
*   **User:** `id, name, email, city, isGoldMember`
*   **Restaurant:** `id, name, rating, cuisine[], menu[]`
*   **MenuItem:** `id, name, price, isVegetarian`
*   **Order:** `id, items[], total, status`

### 5.4 ER Diagram (Conceptual Backend)
*   **Users** (1) ---- (N) **Orders**
*   **Restaurants** (1) ---- (N) **Orders**
*   **Restaurants** (1) ---- (N) **Menus**

---

## 6. Folder Structure
```
src/
 ├── api/             # API logic
 ├── components/      # Reusable UI (Navbar, Card)
 ├── context/         # State (User, Cart)
 ├── pages/           # Screens (Home, Checkout, Train)
 ├── services/        # AI Service
 ├── types.ts         # TypeScript Interfaces
 ├── constants.ts     # Mock Data & Config
 └── App.tsx          # Main Router
```