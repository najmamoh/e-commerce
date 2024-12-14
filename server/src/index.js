"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
// Initialize dotenv to load environment variables
dotenv_1.default.config();
// Create the express app
const app = (0, express_1.default)();
// Get the port from environment variables (falling back to 5000 if not set)
const port = process.env.PORT || 5000;
// Use cors middleware to allow cross-origin requests
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173', // Allow only your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
}));
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Example endpoint
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
