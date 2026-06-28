let tasks = [];
let currentFilter = "all";

function setFilter(filter)
{
    currentFilter = filter;
    renderTasks();
}

function saveTasks()
{
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addSkill()
{
    let input = document.getElementById("addSkill");
    let skill = input.value.trim();

    if(skill == "")
        return;

    tasks.push({id: Date.now(), title: skill, completed: false});
    input.value = "";

    saveTasks();
    renderTasks();
    updateStats();
}

function deleteTask(id)
{
    tasks = tasks.filter(task => task.id !==id)

    saveTasks();
    renderTasks();
    updateStats();
}

function toggleTask(id)
{
    tasks.forEach(task => {if(task.id == id){task.completed = !task.completed;}});

    saveTasks();
    renderTasks();
    updateStats();
}

function editTask(id)
{
    let newTitle = prompt("Edit task: ");
    
    if(newTitle == "")
        return;

    tasks.forEach(task => {if(task.id == id){task.title = newTitle;}});

    saveTasks();
    renderTasks();
}

function updateStats()
{
    let total = tasks.length;
    let completed = tasks.filter(task => task.completed).length;
    let remaining = total - completed;

    document.getElementById("totalTasks").textContent = "Total: " + total;
    document.getElementById("completedTasks").textContent = "Done: " + completed;
    document.getElementById("remainingTasks").textContent = "Left: " + remaining;
}

function renderTasks()
{
    let searchTask = document.getElementById("searchSkill");
    let searchText = searchTask.value.trim().toLowerCase();
    let filteredTasks = tasks;

    if(currentFilter === "completed")
    {
        filteredTasks = tasks.filter(task => task.completed);
    }
    
    else if(currentFilter === "active")
    {
        filteredTasks = tasks.filter(task => !task.completed);
    }
    
    if(searchText != "")
    {
        filteredTasks = filteredTasks.filter(task => task.title.toLowerCase().includes(searchText));
    }

    

    let list = document.getElementById("skillList")
    list.innerHTML = "";

    filteredTasks.forEach(task =>
    {
        let li = document.createElement("li");
        let checkbox = document.createElement("input");
        let deleteButton = document.createElement("button");
        let editButton = document.createElement("button");

        editButton.textContent = "✏️";
        editButton.classList.add("edit-btn");
        editButton.onclick = function() {editTask(task.id);};

        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.onclick = function () {toggleTask(task.id);};

        let taskText = document.createElement("span");
        taskText.textContent = task.title;

        if(task.completed)
        {
            taskText.style.textDecoration = "line-through";
            taskText.style.opacity = "0.5";
        }

        deleteButton.textContent = "X";
        deleteButton.classList.add("delete-btn");
        deleteButton.onclick = function () {deleteTask(task.id);};

        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        list.appendChild(li);
    }    
    )
}

let savedTasks = localStorage.getItem("tasks");

if(savedTasks)
    tasks = JSON.parse(savedTasks);

renderTasks();
updateStats();
