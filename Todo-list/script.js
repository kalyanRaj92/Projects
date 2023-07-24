const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const clearAllTask = document.getElementById("clearAllTask");
let tasks = [];

addButton.addEventListener("click", addTask);
taskList.addEventListener("click", handleTaskClick);
taskList.addEventListener("dragstart", handleDragStart);
taskList.addEventListener("dragover", handleDragOver);
taskList.addEventListener("drop", handleDrop);

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        tasks.push(taskText);
        renderTasks();
        taskInput.value = "";
    }
}

function handleTaskClick(e) {
    if (e.target.classList.contains("remove")) {
        const taskItem = e.target.parentElement;
        const taskItem2 = taskItem.parentElement;
        const taskIndex = Array.from(taskList.children).indexOf(taskItem2);
        tasks.splice(taskIndex, 1);
        renderTasks();
    }
}

function handleDragStart(e) {
    const taskItem = e.target;
    const taskIndex = Array.from(taskList.children).indexOf(taskItem);
    e.dataTransfer.setData("text/plain", taskIndex);
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    const taskIndex = parseInt(e.dataTransfer.getData("text/plain"));
    const dropIndex = Array.from(taskList.children).indexOf(e.target);

    if (taskIndex !== dropIndex && dropIndex !== -1) {
        const [removedTask] = tasks.splice(taskIndex, 1);
        tasks.splice(dropIndex, 0, removedTask);
        renderTasks();
    }
}

function toggleTask(e) {
    if (e.target.tagName === "LI") {
        const taskItem = e.target;
        const taskIndex = Array.from(taskList.children).indexOf(e.target);
        taskItem.classList.toggle("completed"); // Toggle the 'completed' class
        tasks[taskIndex] = tasks[taskIndex].startsWith("✓ ")
            ? tasks[taskIndex].slice(2)
            : "✓ " + tasks[taskIndex];
        renderTasks();
    }
}

taskList.addEventListener("click", toggleTask); // Add event listener for task clicks

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((taskText, index) => {
        const taskItem = document.createElement("li");
        taskItem.textContent = `${index + 1}. ${taskText}`; // Add list number to task text
        taskItem.draggable = true;
        taskItem.dataset.index = index;

        // Add the 'completed' class to completed tasks
        if (taskText.startsWith("✓ ")) {
            taskItem.classList.add("completed");
        }

        const removeButton = document.createElement("button");
        removeButton.innerHTML = `<i class="fa fa-trash remove"></i>`;
        removeButton.classList.add("remove");

        taskItem.appendChild(removeButton);
        taskList.appendChild(taskItem);
    });

    if(taskList.innerHTML !== '') {
        clearAllTask.style.display = 'block';
    }
    else {
        clearAllTask.style.display = 'none';
    }
}

clearAllTask.addEventListener('click', function() {
    taskList.innerHTML = '';
    tasks = [];
    clearAllTask.style.display = 'none';
})