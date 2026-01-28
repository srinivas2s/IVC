const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9090;

app.use(cors());
app.use(express.json());

// Mock Data
const events = [
    { id: 1, title: 'Hackathon 2024', date: '2024-03-15', description: 'Annual 24h Hackathon', image: 'https://via.placeholder.com/300' },
    { id: 2, title: 'AI Workshop', date: '2024-04-10', description: 'Intro to GenAI', image: 'https://via.placeholder.com/300' }
];

const projects = [
    { id: 1, title: 'Smart Campus', domain: 'IoT', description: 'Automating text messaging', image: 'https://via.placeholder.com/300' },
    { id: 2, title: 'Health AI', domain: 'AI/ML', description: 'Diagnosing diseases early', image: 'https://via.placeholder.com/300' }
];

const members = []; // In-memory store for join requests

// API Routes
app.get('/api/events', (req, res) => {
    res.json(events);
});

app.get('/api/projects', (req, res) => {
    res.json(projects);
});

app.post('/api/join', (req, res) => {
    const { name, email, department, year } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and Email are required' });
    }
    const newMember = { id: members.length + 1, name, email, department, year, joinedAt: new Date() };
    members.push(newMember);
    console.log('New Member Joined:', newMember);
    res.status(201).json({ message: 'Successfully joined IVC!', member: newMember });
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
