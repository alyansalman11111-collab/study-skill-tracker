let tasks = [];

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
}

function deleteTask(id)
{
    tasks = tasks.filter(task => task.id !== id)
    
    saveTasks();
    renderTasks();
}

function toggleTask(id)
{
    tasks.forEach(task => {if(task.id == id){ task.completed = !task.completed;}})
    
    saveTasks();
    renderTasks();
}

function renderTasks()
{
    let list = document.getElementById("skillList");
    list.innerHTML = "";

    tasks.forEach(task => 
    {
        let li = document.createElement("li");
        let checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.onclick = function () { toggleTask(task.id); };

        let taskText = document.createElement("span");
        taskText.textContent = task.title;

        if(task.completed)
        {
            taskText.style.textDecoration = "line-through";
            taskText.style.opacity = "0.5";
        }

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.classList.add("delete-btn")

        deleteButton.onclick = function() {deleteTask(task.id);};

        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(deleteButton);

        list.appendChild(li);
    });
}

let savedTasks = localStorage.getItem("tasks");

if(savedTasks)
{
    tasks = JSON.parse(savedTasks);
    renderTasks();
}
