// Load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    displayTasks(tasks);
}

// Save tasks to local storage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add a new task
function addTask() {
    const date = document.getElementById("date").value;
    const category = document.getElementById("category").value;
    const note = document.getElementById("note").value;

    if (!date || !category) {
        alert("Please fill in the required fields.");
        return;
    }

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ date, category, note });
    saveTasks(tasks);
    displayTasks(tasks);

    // Clear form fields
    document.getElementById("date").value = '';
    document.getElementById("category").value = '';
    document.getElementById("note").value = '';
}

// Display tasks in the table
function displayTasks(tasks) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const row = document.createElement("tr");
        row.classList.add('new-task');
        row.innerHTML = `
            <td>${task.date}</td>
            <td>${task.category}</td>
            <td>${task.note}</td>
            <td><button class="remove-btn" onclick="removeTask(${index})">Remove</button></td>
        `;
        taskList.appendChild(row);

        // Remove highlight after a short time to indicate completion
        setTimeout(() => {
            row.classList.remove('new-task');
        }, 2000);
    });
}

// Remove a task by index
function removeTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    saveTasks(tasks);
    displayTasks(tasks);
}

// Initialize app
loadTasks();