let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display tasks
function displayTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  // ✅ EMPTY STATE (this is where it goes)
  if (tasks.length === 0) {
    list.innerHTML = "<p>No tasks yet. Add something! 🚀</p>";
    return;
  }

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.classList.add(task.priority.toLowerCase());
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <div>
        <input type="checkbox" ${task.completed ? "checked" : ""}
          onchange="toggleComplete(${index})">
        ${task.text} <br>
        <small>${task.time}</small>
      </div>

      <div>
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;

    list.appendChild(li);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add task
function addTask() {
  const input = document.getElementById("taskInput");
  const priority = document.getElementById("priority").value;

  if (input.value.trim() === "") return;

  const newTask = {
    text: input.value,
    priority: priority,
    completed: false,
    time: new Date().toLocaleString()
  };

  tasks.push(newTask);
  input.value = "";

  displayTasks();
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  displayTasks();
}

// Edit task
function editTask(index) {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText) {
    tasks[index].text = newText;
    displayTasks();
  }
}

// Toggle complete
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  displayTasks();
}

// Dark mode
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// Initial display
displayTasks();