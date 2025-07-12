# e-Procurement API

## Overview
The e-Procurement API is a basic implementation of an E-Procurement system that allows for user authentication, vendor registration, and product management through a RESTful API. This project is built using Node.js and Express.

## Features
- **User Authentication**: Users can register and log in to access the system.
- **Vendor Registration**: Vendors can register to offer their products.
- **Product Catalog**: A CRUD (Create, Read, Update, Delete) interface for managing products associated with vendors.

## Project Structure
```
e-procurement-api
├── src
│   ├── app.js                  # Entry point of the application
│   ├── controllers             # Contains controller logic for handling requests
│   │   ├── authController.js   # User authentication logic
│   │   ├── vendorController.js  # Vendor management logic
│   │   └── productController.js # Product management logic
│   ├── middleware              # Middleware functions for request handling
│   │   ├── auth.js             # Authentication middleware
│   │   └── validation.js       # Request validation middleware
│   ├── models                  # Database models
│   │   ├── User.js             # User model
│   │   ├── Vendor.js           # Vendor model
│   │   └── Product.js          # Product model
│   ├── routes                  # API route definitions
│   │   ├── auth.js             # Authentication routes
│   │   ├── vendors.js          # Vendor routes
│   │   └── products.js         # Product routes
│   ├── config                  # Configuration files
│   │   └── database.js         # Database connection configuration
│   └── utils                   # Utility functions
│       └── helpers.js          # Helper functions
├── tests                       # Unit tests for the application
│   ├── auth.test.js            # Tests for authentication functionality
│   ├── vendors.test.js         # Tests for vendor functionality
│   └── products.test.js        # Tests for product functionality
├── package.json                # NPM package configuration
├── .env.example                # Example environment variables
├── .gitignore                  # Git ignore file
└── README.md                   # Project documentation
```

## Getting Started

### Prerequisites
- Node.js
- npm (Node Package Manager)
- MongoDB (or any other database of your choice)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd e-procurement-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` and fill in the required values.

### Running the Application
To start the server, run:
```
npm start
```
The API will be available at `http://localhost:3000`.

### API Endpoints
- **Authentication**
  - `POST /api/auth/register` - Register a new user
  - `POST /api/auth/login` - Log in a user

- **Vendor Management**
  - `POST /api/vendors` - Register a new vendor
  - `GET /api/vendors` - Get all vendors
  - `GET /api/vendors/:id` - Get a vendor by ID
  - `PUT /api/vendors/:id` - Update a vendor
  - `DELETE /api/vendors/:id` - Delete a vendor

- **Product Management**
  - `POST /api/products` - Create a new product
  - `GET /api/products` - Get all products
  - `GET /api/products/:id` - Get a product by ID
  - `PUT /api/products/:id` - Update a product
  - `DELETE /api/products/:id` - Delete a product

## Testing
To run the tests, use:
```
npm test
```

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License.