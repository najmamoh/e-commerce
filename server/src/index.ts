const cors = require('cors');
import dotenv from 'dotenv';
import express from 'express';
import  Products  from './routes/product';
// Initialize dotenv to load environment variables
dotenv.config();

// Create the express app
const app = express();
app.use(express.json())

// Get the port from environment variables (falling back to 5000 if not set)
const port = process.env.PORT || 5000;

// Use cors middleware to allow cross-origin requests
app.use(cors());


app.use('/products',Products)

// Middleware to parse JSON bodies
app.use(express.json());



// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
