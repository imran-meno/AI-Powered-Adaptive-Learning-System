
const dotenv = require('dotenv');
const path = require('path');

// Load .env from the backend folder
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');

const materialRoutes = require('../routes/materials');
const studyProfileRoutes = require('../routes/studyProfile');
const connectDB = require('../config/db');

const app = express();

app.use(cors());
app.use(express.json());

// Account creation route
app.use('/api/createaccount', require('../routes/createaccount'));

// Login route
app.use('/api/login', require('../routes/login'));

// PDF upload route
app.use('/api/materials', materialRoutes);
app.use('/api/study-profile', studyProfileRoutes);

app.get('/', (req, res) => {
    res.send('Hello from Imran Khan Dev');
});

// Connect MongoDB and start server
async function startServer() {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is required. Add it to backend/.env before starting the API.');
        }

        console.log(
            'MongoDB URI loaded:',
            !!process.env.connectionurl
        );

        console.log(
            'RAG URL loaded:',
            !!process.env.RAG_SERVICE_URL
        );

        await connectDB();

        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });

    } catch (error) {
        console.log('Server startup failed:', error.message);
    }
}

startServer();
