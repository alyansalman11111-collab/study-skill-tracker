console.log("SCRIPT LOADED");

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

    let priorityInput = document.getElementById("priority");
    let priority = priorityInput.value;

    if(skill == "")
        return;

    tasks.push({id: Date.now(), title: skill, completed: false, priority: priority});
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
    let percentage = 0;

    if (total > 0)
    {
        percentage = (completed / total) * 100;
    }

    document.getElementById("totalTasks").textContent = "Total: " + total;
    document.getElementById("completedTasks").textContent = "Done: " + completed;
    document.getElementById("remainingTasks").textContent = "Left: " + remaining;
    document.getElementById("progressBar").style.width = percentage + "%";
    document.getElementById("progressText").textContent = Math.round(percentage) + "% Completed";
}

function renderTasks()
{
    let searchTask = document.getElementById("searchSkill");
    let searchText = searchTask.value.trim().toLowerCase();
    let filteredTasks = tasks;
    let sortOption = document.getElementById("sortTasks").value;

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

    if (sortOption === "az")
    {
        filteredTasks.sort((a, b) => a.title.localeCompare(b.title));
    }

    else if (sortOption === "za")
    {
        filteredTasks.sort((a, b) => b.title.localeCompare(a.title));
    }
    
    else if (sortOption === "priorityHigh")
    {
        const priorityOrder =
        {
            High: 3,
            Medium: 2,
            Low: 1
        };

        filteredTasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    }

    else if (sortOption === "priorityLow")
    {
        const priorityOrder =
        {
            High: 3,
            Medium: 2,
            Low: 1
        };

        filteredTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
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

        let priority = document.createElement("span");
        let taskPriority = task.priority || "Medium";

        priority.textContent = taskPriority;
        priority.classList.add("priority");
        priority.classList.add(taskPriority.toLowerCase());

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
        li.appendChild(priority);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        list.appendChild(li);
    }    
    )
}

function toggleTheme()
{
    document.body.classList.toggle("dark");

    let button = document.getElementById("themeToggle");

    if(document.body.classList.contains("dark"))
    {
        button.textContent = "☀️ Light Mode";
        localStorage.setItem("theme", "dark");
    }
    else
    {
        button.textContent = "🌙 Dark Mode";
        localStorage.setItem("theme", "light");
    }
}

let savedTasks = localStorage.getItem("tasks");

if(savedTasks)
    tasks = JSON.parse(savedTasks);

renderTasks();
updateStats();

let savedTheme = localStorage.getItem("theme");

if(savedTheme === "dark")
{
    document.body.classList.add("dark");
    document.getElementById("themeToggle").textContent = "☀️ Light Mode";
}
