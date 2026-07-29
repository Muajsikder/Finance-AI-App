# FinanceAI – AI Financial Advisor Web Application

## Overview

FinanceAI is a full-stack AI-powered financial advisor web application that helps users manage their personal finances in one place. Users can create an account, securely log in, manage their investment portfolio, track financial transactions, and receive AI-generated financial guidance using Google's Gemini API.

The application is built using Node.js, Express.js, MongoDB, and JavaScript, with a responsive frontend designed for an intuitive user experience.

---

# Features

* User registration and login
* Secure JWT authentication
* Password encryption using bcrypt
* Protected dashboard for authenticated users
* Investment portfolio management
* Transaction management
* AI financial advisor powered by Google Gemini API
* MongoDB database for persistent data storage
* Responsive web interface

---

# Technologies Used

## Frontend

* HTML5
* CSS3
* JavaScript

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## Authentication

* JSON Web Token (JWT)
* bcrypt

## AI

* Google Gemini API

---

# Project Structure

```text
FinanceAI
│
├── models
│   ├── User.js
│   ├── Portfolio.js
│   └── Transaction.js
│
├── routes
│   ├── ai.js
│   ├── portfolio.js
│   ├── transactions.js
│   └── auth.js
│
├── public
│   ├── index.html
│   ├── signup.html
│   ├── dashboard.html
│   ├── portfolio.html
│   ├── transactions.html
│   ├── ai.html
│   ├── style.css
│   └── JavaScript files
│
├── server.js
├── package.json
├── .env.example
└── README.md