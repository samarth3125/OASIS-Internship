function addTask() {
  let taskInput = document.getElementById("taskInput");
  let taskText = taskInput.value.trim();
  if (taskText === "") return alert("Please enter a task");

  let date = new Date();
  let dateString = date.toLocaleString();

  let li = createTaskElement(taskText, dateString, false);
  document.getElementById("pendingTasks").appendChild(li);

  taskInput.value = "";
}

function createTaskElement(taskText, dateString, isCompleted) {
  let li = document.createElement("li");

  let taskInfo = document.createElement("div");
  taskInfo.className = "task-info";

  let taskTitle = document.createElement("span");
  taskTitle.textContent = taskText;

  let dateSpan = document.createElement("span");
  dateSpan.className = "date";
  dateSpan.textContent = isCompleted 
    ? `Completed: ${dateString}` 
    : `Added: ${dateString}`;

  taskInfo.appendChild(taskTitle);
  taskInfo.appendChild(dateSpan);

  let actions = document.createElement("div");
  actions.className = "task-actions";

  if (!isCompleted) {
    let completeBtn = document.createElement("button");
    completeBtn.textContent = "✔";
    completeBtn.className = "complete-btn";
    completeBtn.onclick = () => markComplete(li, taskText);
    actions.appendChild(completeBtn);

    let editBtn = document.createElement("button");
    editBtn.textContent = "✏";
    editBtn.className = "edit-btn";
    editBtn.onclick = () => editTask(taskTitle);
    actions.appendChild(editBtn);
  }

  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = () => li.remove();
  actions.appendChild(deleteBtn);

  li.appendChild(taskInfo);
  li.appendChild(actions);

  return li;
}

function markComplete(taskElement, taskText) {
  taskElement.remove();

  let date = new Date();
  let dateString = date.toLocaleString();

  let li = createTaskElement(taskText, dateString, true);
  document.getElementById("completedTasks").appendChild(li);
}

function editTask(taskTitle) {
  let newTask = prompt("Edit your task", taskTitle.textContent);
  if (newTask !== null && newTask.trim() !== "") {
    taskTitle.textContent = newTask.trim();
  }
}
