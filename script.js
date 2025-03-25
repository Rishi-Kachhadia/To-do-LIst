document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") return;

    let li = document.createElement("li");
    li.innerHTML = `${taskInput.value} <button class="delete-btn" onclick="deleteTask(this)">❌</button>`;
    
    li.addEventListener("click", function() {
        li.classList.toggle("completed");
        saveTasks();
    });

    taskList.appendChild(li);
    saveTasks();

    taskInput.value = "";
}

function deleteTask(button) {
    button.parentElement.remove();
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({ text: li.textContent.replace("❌", "").trim(), completed: li.classList.contains("completed") });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");

    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `${task.text} <button class="delete-btn" onclick="deleteTask(this)">❌</button>`;
        
        if (task.completed) li.classList.add("completed");

        li.addEventListener("click", function() {
            li.classList.toggle("completed");
            saveTasks();
        });

        taskList.appendChild(li);
    });
}

function clearTasks() {
    document.getElementById("taskList").innerHTML = "";
    localStorage.removeItem("tasks");
}