📝 Project README for Crypto Dashboard
Backend
In the backend folder, set up the backend with the following structure:

server.js
Endpoints:
GET /api/coins - Retrieves all available coins.
GET /api/coins/:id - Retrieves a specific coin based on ID.
GET /api/coins/:id/history - Retrieves historical data for a specific coin.
Frontend
The web application is developed using React with Vite as the build tool. The src folder structure includes:

Components (src/components)
Navbar: Navigation component for the app.
Footer: Footer section for the app.
LineChart: Main component for displaying cryptocurrency charts.
Context (src/context)
CoinContext.jsx: Context file managing state and logic globally across the app.
Pages (src/pages)
Home (src/pages/Home.jsx): Homepage of the application.

Features:
Search bar for live crypto search.
Displays top 10 cryptocurrencies in the world, fetched from /api/coins endpoint.
Clicking on a specific coin redirects to its details page (/coin/:id).
Coin (src/pages/Coin.jsx): Page for displaying details of a specific cryptocurrency.

Features:
Displays detailed information and historical data of the selected coin.
Utilizes Google Charts for displaying historical price data fetched from /api/coins/:id/history endpoint.
Setup Instructions
Backend Setup:

Navigate to backend folder and run npm install to install dependencies.
Start the backend server with npm start.
Frontend Setup:

Navigate to frontend folder and run npm install to install dependencies.
Start the frontend development server with npm run dev.
Accessing the App:

Once both servers are running, open your browser and go to http://localhost:3000 to view the application.
Technologies Used
Backend: Node.js, Express.js
Frontend: React, Vite
Charts: Google Charts
