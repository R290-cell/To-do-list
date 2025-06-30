// Load tasks on page load
document.addEventListener("DOMContentLoaded", loadTasks);

function addItem() {
  const input = document.getElementById("input-field");
  const value = input.value.trim();
  if (value === "") {
    alert("Please enter a task.");
    return;
  }

  const task = {
    text: value,
    completed: false
  };

  addTaskToUI(task);
  saveTask(task);
  input.value = "";
}

function addTaskToUI(task, index = null) {
  const ul = document.getElementById("ul-list");

  const li = document.createElement("li");
  if (task.completed) li.classList.add("completed");

  const span = document.createElement("span");
  span.textContent = task.text;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.onchange = () => toggleComplete(li, index);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.onclick = () => deleteTask(li, index);

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  ul.appendChild(li);
}

function resetAll() {
  localStorage.removeItem("tasks");
  document.getElementById("ul-list").innerHTML = "";
}

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task, index) => addTaskToUI(task, index));
}

function toggleComplete(li, index) {
  li.classList.toggle("completed");
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(li, index) {
  li.remove();
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  // Rebuild the list with correct indexes
  document.getElementById("ul-list").innerHTML = "";
  tasks.forEach((task, i) => addTaskToUI(task, i));
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const themeBtn = document.getElementById("theme-toggle");
  themeBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
}
document.addEventListener("DOMContentLoaded", loadTasks);

function addItem() {
  const input = document.getElementById("input-field");
  const dueDateInput = document.getElementById("due-date");
  const tagInput = document.getElementById("tag-field");

  const value = input.value.trim();
  const dueDate = dueDateInput.value;
  const tag = tagInput.value.trim();

  if (value === "") {
    alert("Please enter a task.");
    return;
  }

  const task = {
    text: value,
    completed: false,
    dueDate: dueDate,
    tag: tag
  };

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  addTaskToUI(task, tasks.length - 1);

  input.value = "";
  dueDateInput.value = "";
  tagInput.value = "";
}

function addTaskToUI(task, index) {
  const ul = document.getElementById("ul-list");

  const li = document.createElement("li");
  if (task.completed) li.classList.add("completed");

  // Check if task is overdue
  if (task.dueDate && !task.completed && new Date(task.dueDate) < new Date()) {
    li.classList.add("overdue");
  }

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.onchange = () => toggleComplete(li, index);

  const span = document.createElement("span");
  span.textContent = task.text;

  const meta = document.createElement("div");
  meta.className = "task-meta";

  if (task.dueDate) {
    const date = document.createElement("div");
    date.className = "due-date";
    date.textContent = `Due: ${task.dueDate}`;
    meta.appendChild(date);
  }

  if (task.tag) {
    const tagLabel = document.createElement("div");
    tagLabel.className = "tag";
    tagLabel.textContent = `#${task.tag}`;
    meta.appendChild(tagLabel);
  }

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.onclick = () => deleteTask(li, index);

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(meta);
  li.appendChild(deleteBtn);
  ul.appendChild(li);
}

function toggleComplete(li, index) {
  li.classList.toggle("completed");

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Remove overdue highlight if marked complete
  if (tasks[index].completed) {
    li.classList.remove("overdue");
  }
}

function deleteTask(li, index) {
  li.remove();
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Rebuild list
  document.getElementById("ul-list").innerHTML = "";
  tasks.forEach((task, i) => addTaskToUI(task, i));
}

function resetAll() {
  localStorage.removeItem("tasks");
  document.getElementById("ul-list").innerHTML = "";
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task, index) => addTaskToUI(task, index));
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const themeBtn = document.getElementById("theme-toggle");
  themeBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
}
document.addEventListener("DOMContentLoaded", loadTasks);document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  requestNotificationPermission();
  setInterval(checkDueTasks, 60000); // Check every 1 minute
});

