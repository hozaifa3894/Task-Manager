const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let tasks = []; // Temporary storage

// AI Logic
function getAITag(text) {
    const val = text.toLowerCase();
    if (val.includes('urgent') || val.includes('exam')) return "🔴 AI: High";
    if (val.includes('code') || val.includes('study')) return "🔵 AI: Work";
    return "🟢 AI: Routine";
}

// Routes
app.get('/tasks', (req, res) => res.json(tasks));

app.post('/tasks', (req, res) => {
    const newTask = { 
        id: Date.now(), 
        text: req.body.text, 
        aiTag: getAITag(req.body.text) 
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Single Delete
app.delete('/tasks/:id', (req, res) => {
    const taskId = Number(req.params.id);
    tasks = tasks.filter(t => t.id !== taskId);
    res.status(204).send();
});

// --- NEW: Clear All Tasks ---
app.delete('/tasks-clear-all', (req, res) => {
    tasks = []; // Array ko pura khali kar diya
    res.status(204).send();
});

app.listen(PORT, () => console.log(`Mohd Hozaifa's App: http://localhost:${PORT}`));