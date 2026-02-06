# Expense Tracker Application

Welcome to the Expense Tracker! This application helps you manage your finances by tracking your income, expenses, and generating insightful reports. Below is a comprehensive overview of all the features available in this project.

## Features

### User Authentication
- **Sign Up & Login:** Secure registration and login for users.
- **Protected Routes:** Only authenticated users can access certain pages.

### Account Management
- **Add Accounts:** Create multiple accounts (e.g., bank, cash, wallet).
- **Edit/Delete Accounts:** Update or remove accounts as needed.

### Transaction Management
- **Add Transactions:** Record income and expenses with details like amount, category, and date.
- **Edit/Delete Transactions:** Modify or remove transactions.
- **Category Management:** Organize transactions by categories (e.g., Food, Travel, Bills).

### Reports & Dashboard
- **Dashboard Chart:** Visualize your spending and income trends with interactive charts.
- **Summary Reports:** Get monthly and yearly summaries of your finances.

### User Interface
- **Modern UI:** Clean and responsive design for a seamless experience.
- **Navigation Bar:** Easy navigation between different sections.
- **Footer:** Quick links and contact information.

### Additional Pages
- **Home:** Overview of the app and its benefits.
- **Features:** Detailed list of what the app offers.
- **FAQ:** Frequently asked questions for user support.
- **Contact Us:** Get in touch with the development team.

### Security
- **JWT Authentication:** Secure API endpoints using JSON Web Tokens.
- **Password Hashing:** User passwords are securely hashed.

### Backend
- **RESTful API:** Node.js and Express.js backend for handling all operations.
- **MongoDB Database:** Stores user data, accounts, and transactions.
- **Middleware:** Handles authentication and error management.

### Frontend
- **React.js:** Modern frontend framework for building user interfaces.
- **Vite:** Fast development and build tool.
- **Context API:** Manages authentication state across the app.

## Getting Started

### Prerequisites
- Node.js
- npm or yarn
- MongoDB

### Installation
1. Clone the repository.
2. Install dependencies for both Backend and Frontend:
   - `cd Backend && npm install`
   - `cd ../Frontend && npm install`
3. Set up environment variables as needed (see sample `.env` files).
4. Start the backend server:
   - `cd Backend && npm start`
5. Start the frontend app:
   - `cd ../Frontend && npm run dev`

## Contributing
Feel free to open issues or submit pull requests for improvements and bug fixes.

## License
This project is licensed under the MIT License.

---

**Enjoy tracking your expenses and taking control of your finances!**
