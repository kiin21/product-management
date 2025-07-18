# Product Management System

<div align="center">
  <h3 align="center">Full-Stack E-commerce Product Management System</h3>
  <p align="center">
    A comprehensive web application for managing products, categories, users, and orders with both admin and client interfaces.
    <br />
    <a href="#features"><strong>Explore Features »</strong></a>
    <br />
    <br />
    <a href="#demo">View Demo</a>
    ·
    <a href="#installation">Installation</a>
    ·
    <a href="#usage">Usage</a>
  </p>
</div>

## About The Project

This Product Management System is a full-featured e-commerce web application built with Node.js, Express, and MongoDB. It provides comprehensive functionality for both administrators and customers, including product management, user authentication, shopping cart, order processing, and real-time chat support.

### Key Features

- **Admin Dashboard**: Complete product and category management with role-based permissions
- **User Management**: Customer registration, login, and profile management
- **Product Catalog**: Browse products by categories with search and filtering
- **Shopping Cart**: Add, update, and remove products from cart
- **Order Processing**: Complete checkout process with order tracking
- **Real-time Chat**: Socket.io powered customer support chat
- **Password Recovery**: Email-based OTP password reset system
- **Image Management**: Cloudinary integration for image uploads
- **Responsive Design**: Mobile-friendly interface

### Built With

* [![Node.js][Node.js]][Node-url]
* [![Express.js][Express.js]][Express-url]
* [![MongoDB][MongoDB]][MongoDB-url]
* [![Socket.io][Socket.io]][Socket-url]
* [![Pug][Pug.js]][Pug-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![Cloudinary][Cloudinary]][Cloudinary-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Make sure you have the following installed:
* Node.js (v18 or higher)
  ```sh
  node --version
  ```
* npm
  ```sh
  npm install npm@latest -g
  ```
* MongoDB (local installation or MongoDB Atlas account)

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/kiin21/product-management.git
   ```

2. Navigate to the project directory
   ```sh
   cd product-management
   ```

3. Install NPM packages
   ```sh
   npm install
   ```

4. Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=3000
   MONGO_URL=mongodb://localhost:27017/Product-Management
   # or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/Product-Management
   
   # Cloudinary Configuration (for image uploads)
   CLOUD_NAME=your_cloudinary_cloud_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret
   
   # Email Configuration (for OTP)
   EMAIL_OTP=your_email@gmail.com
   PASS_OTP=your_app_password
   
   # OTP Configuration
   OTP_EXPIRED_TIME=300
   ```

5. Start the development server
   ```sh
   # With local
   npm start

   # With docker container
   docker compose up -d
   ```

6. Open your browser and navigate to `http://localhost:3000`

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Features

### Admin Panel (`/admin`)
- **Dashboard**: Overview statistics for products, categories, users, and orders
- **Product Management**: Create, edit, delete, and manage product inventory
- **Category Management**: Hierarchical product category system
- **User Management**: Manage customer accounts and admin users
- **Role & Permissions**: Granular permission system for different admin roles
- **Order Management**: View and process customer orders
- **Settings**: Configure general application settings

### Client Interface
- **Product Catalog**: Browse products with categories, search, and filters
- **Product Details**: Detailed product pages with images and descriptions
- **Shopping Cart**: Add/remove products, update quantities
- **User Authentication**: Registration, login, and profile management
- **Password Recovery**: Email-based OTP system for password reset
- **Checkout Process**: Complete order placement with user information
- **Real-time Chat**: Customer support chat with Socket.io
- **Responsive Design**: Mobile-friendly interface

### Technical Features
- **Authentication & Authorization**: Session-based auth with role permissions
- **Image Upload**: Cloudinary integration for product images
- **Search & Pagination**: Advanced search with pagination support
- **Email Integration**: Nodemailer for OTP and notifications
- **Real-time Communication**: Socket.io for chat functionality
- **Data Validation**: Server-side validation for all forms
- **Error Handling**: Comprehensive error handling and user feedback

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Docker Support

### Using Docker Compose

1. Make sure you have Docker and Docker Compose installed
2. Create a `.env` file with your environment variables
3. Run the application with Docker Compose:
   ```sh
   docker-compose up --build
   ```

### Manual Docker Build

1. Build the Docker image:
   ```sh
   docker build -t product-management .
   ```

2. Run the container:
   ```sh
   docker run --env-file .env -p 3000:3000 product-management
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Project Structure

```
product-management/
├── controllers/          # Route controllers
│   ├── admin/           # Admin panel controllers
│   └── client/          # Client-side controllers
├── models/              # MongoDB data models
├── views/               # Pug templates
│   ├── admin/           # Admin panel views
│   └── client/          # Client-side views
├── routers/             # Express route definitions
├── middlewares/         # Custom middleware functions
├── helpers/             # Utility functions
├── public/              # Static assets (CSS, JS, images)
├── config/              # Configuration files
├── validates/           # Input validation rules
├── docs/                # Project documentation and screenshots
├── Dockerfile           # Docker configuration
├── docker-compose.yml   # Docker Compose configuration
└── index.js             # Application entry point
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## API Endpoints

### Admin Routes (`/admin`)
- `GET /admin/dashboard` - Admin dashboard
- `GET/POST /admin/products` - Product management
- `GET/POST /admin/product-category` - Category management
- `GET/POST /admin/accounts` - User account management
- `GET/POST /admin/roles` - Role and permission management
- `GET/PATCH /admin/setting` - Application settings

### Client Routes
- `GET /` - Homepage
- `GET /products` - Product catalog
- `GET /products/detail/:slug` - Product details
- `GET/POST /cart` - Shopping cart
- `GET/POST /checkout` - Checkout process
- `GET/POST /user/register` - User registration
- `GET/POST /user/login` - User login
- `GET/POST /user/password/recover` - Password recovery
- `GET /chat` - Real-time chat (authenticated users)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port (default: 3000) | Yes |
| `MONGO_URL` | MongoDB connection string | Yes |
| `CLOUD_NAME` | Cloudinary cloud name | Yes |
| `API_KEY` | Cloudinary API key | Yes |
| `API_SECRET` | Cloudinary API secret | Yes |
| `EMAIL_OTP` | Email for sending OTP | Yes |
| `PASS_OTP` | Email app password | Yes |
| `OTP_EXPIRED_TIME` | OTP expiration time in seconds | Yes |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Screenshots

### Admin Dashboard
![Admin Dashboard](docs/admin-dashboard.png)

### Product Management
![Product Admin](docs/product-admin.png)

### Role & Permissions
![Role Permission](docs/role-permission.png)

### Client Homepage
![Homepage](docs/home.png)

### Product Details
![Product Detail](docs/product-detail.png)

### User Login
![Login](docs/login.png)

### Password Recovery
![Password Recovery](docs/password-recovery.png)

### Shopping Cart
![Cart](docs/cart.png)

### Checkout Process
![Checkout](docs/checkout.png)

### Order Status
![Order Status](docs/order-status.png)

### Real-time Chat
![Chat](docs/chat-socket.png)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Recap

* [Express.js](https://expressjs.com) - Fast, unopinionated, minimalist web framework
* [MongoDB](https://www.mongodb.com) - NoSQL database
* [Mongoose](https://mongoosejs.com) - MongoDB object modeling
* [Socket.io](https://socket.io) - Real-time bidirectional event-based communication
* [Cloudinary](https://cloudinary.com) - Image and video management
* [Nodemailer](https://nodemailer.com) - Email sending for Node.js
* [Pug](https://pugjs.org) - Template engine
* [Bootstrap](https://getbootstrap.com) - CSS framework
* [Font Awesome](https://fontawesome.com) - Icon library

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/
[Express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
[MongoDB]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[Socket.io]: https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101
[Socket-url]: https://socket.io/
[Pug.js]: https://img.shields.io/badge/Pug-A86454?style=for-the-badge&logo=pug&logoColor=white
[Pug-url]: https://pugjs.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[Cloudinary]: https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white
[Cloudinary-url]: https://cloudinary.com