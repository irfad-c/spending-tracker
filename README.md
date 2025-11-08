# 💰 Spending Tracker Web App (MERN)

A full-stack MERN (MongoDB, Express, React, Node.js) application that helps users track their personal expenses and income. It provides a clear summary of total balance, total income, and total expenses, along with a detailed transaction history.


## 🚀 Features

* View financial summary – Total balance, total income, and total expenses at a glance.
* Category-based tracking – Separate lists for income and expenses.
* Complete transaction history – Easily view, add, or delete any transaction.
* Manage categories – Add or delete income and expense categories.
* Secure user authentication – Implemented with JWT and password hashing.
* Cloud database – Uses MongoDB Atlas for secure data storage.
* Responsive design – Optimized for both desktop and mobile devices.


## 🛠️ Tech Stack

Frontend: JSX,React,Context API,CSS (Responsive Design)

Backend: Node.js, Express.js , Mongoose

Database: MongoDB Atlas (NoSQL Cloud Database)

Authentication: JSON Web Token (JWT), bcrypt.js (Password Hashing)

Version Control: Git & GitHub

Development Tools: Visual Studio Code, Postman, Nodemon

## 💻 Screenshots

### 🔐 Login Page
<img width="1914" height="724" alt="Login" src="https://github.com/user-attachments/assets/4f9ef44d-8c78-453f-a31e-2a305add3b34" />

### 🏠 Dashboard
<img width="1883" height="880" alt="Home" src="https://github.com/user-attachments/assets/8ba3f897-c6f6-4f46-956e-5fb1cd38384a" />

### 💰 Transactions
<img width="1883" height="867" alt="Transactions" src="https://github.com/user-attachments/assets/917c9ea3-64a3-40b3-8310-dcf1427e9a4c" />

### 📊 Categories
<img width="1888" height="888" alt="Categories" src="https://github.com/user-attachments/assets/415cc00f-4881-4c31-943f-5d5e6319d3ec" />

## ⚙️ Installation and Setup

1️⃣ Clone the repository

git clone https://github.com/irfad-c/spending-tracker.git

cd spending-tracker

2️⃣ Install dependencies

For server:

cd server

npm install

For frontend:

cd client

npm install


3️⃣ Set up environment variables

Create a .env file inside the backend folder and add:

PORT=5000 

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=type_secret_key_here

Note:

 The backend is hosted online, so you don’t need to run it locally.
 
 If you want to run both locally, they can set PORT=5000 in their own .env file and update the frontend BASE_URL to http://localhost:5000.


4️⃣ Run the app

Start backend:

npm run server


Start frontend:

npm start


## 📬 Contact

If you have suggestions or feedback, feel free to reach out:

📧 irfadc500@email.com



