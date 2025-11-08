# 💰 Spending Tracker Web App (MERN)

A full-stack MERN (MongoDB, Express, React, Node.js) application that helps users track their personal expenses and income. It provides a clear summary of total balance, total income, and total expenses, along with a detailed transaction history.


## 🚀 Features

* Add/Delete income and expense transactions
* View total balance, total income, and total expenses
* Category wise lists for income and expense.
* View complete transaction history
* Add/Delete income and expense categories
* Delete transactions
* Responsive design for desktop and mobile
* Uses MongoDB Atlas for cloud data storage


## 🛠️ Tech Stack

Frontend: JSX,CSS,React

Backend: Node.js, Express.js , Mongoose

Database: MongoDB Atlas




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



