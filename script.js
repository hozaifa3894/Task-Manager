async function loadTasks() {
    const res = await fetch('/tasks');
    const tasks = await res.json();
    const list = document.getElementById('taskList');
    list.innerHTML = ''; 

    tasks.forEach(task => {
        const div = document.createElement('div');
        div.className = 'task-card';
        div.innerHTML = `
            <div class="task-info">
                <span class="ai-badge">${task.aiTag}</span>
                <p>${task.text}</p>
            </div>
            <i class="fas fa-trash delete-btn" onclick="deleteTask(${task.id})"></i>
        `;
        list.appendChild(div);
    });
}

async function addTask() {
    const input = document.getElementById('taskInput');
    if (!input.value.trim()) return;

    await fetch('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input.value })
    });
    input.value = '';
    loadTasks();
}

async function deleteTask(id) {
    if (!confirm("Delete karna hai?")) return;
    await fetch(`/tasks/${id}`, { method: 'DELETE' });
    loadTasks();
}

// --- NEW: Clear All Logic ---
async function clearAllTasks() {
    if (!confirm("Kya aap saare tasks ek saath delete karna chahte hain?")) return;
    
    const res = await fetch('/tasks-clear-all', { method: 'DELETE' });
    if (res.ok) {
        loadTasks(); // Screen refresh ho jayegi
    }
}

document.addEventListener('DOMContentLoaded', loadTasks);