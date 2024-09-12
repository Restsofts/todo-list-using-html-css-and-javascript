// app.js

// Initialize an empty array to store tasks
let tasks = [];

// Function to add a task to the list
function addTask() {
  // Get the task input value
  let taskInput = document.getElementById("taskInput");
  let task = taskInput.value;

  // Ensure task is not empty
  if (task !== "") {
    tasks.push(task); // Add task to the array

    updateTaskList(); // Update the UI with the new task

    taskInput.value = ""; // Clear the input field
  }
}

// Function to update the UI with tasks
function updateTaskList() {
  let taskList = document.getElementById("taskList");
  taskList.innerHTML = ""; // Clear previous list

  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.textContent = task;

    // Add a delete button for each task
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "حذف";
    deleteButton.onclick = function () {
      removeTask(index);
    };

    li.appendChild(deleteButton); // Append the delete button to the task
    taskList.appendChild(li); // Add the task to the UI
  });
}

// Function to remove a task from the list
function removeTask(index) {
  tasks.splice(index, 1); // Remove task from array
  updateTaskList(); // Update the UI
}

// Function to save tasks to a JSON file
function saveTasks() {
  let jsonTasks = JSON.stringify(tasks); // Convert tasks to JSON string

  // Create a Blob to save as a JSON file
  let blob = new Blob([jsonTasks], { type: "application/json" });
  let link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "tasks.json"; // Set the filename
  link.click(); // Trigger the download
}

// Function to load tasks from a JSON file
function loadTasks() {
  let input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";
  input.onchange = function (event) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
      tasks = JSON.parse(e.target.result); // Parse JSON and load tasks
      updateTaskList(); // Update the UI with the loaded tasks
    };
    reader.readAsText(file); // Read the file content
  };
  input.click(); // Open the file dialog
}
