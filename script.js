let tasks = [];

function addSkill()
{
    let input = document.getElementById("addSkill");
    let skill = input.value.trim();

    if(skill == "")
        return

    tasks.push({id: Date.now(), title: skill, completed: false});
    
    input.value = "";
    
    renderTasks();
}

function deleteTask(id)
{
    tasks = tasks.filter(task => task.id !== id)

    renderTasks();
}

function renderTasks()
{
    let list = document.getElementById("skillList");
    list.innerHTML = "";

    tasks.forEach(task => 
    {
        let li = document.createElement("li");
        let taskText = document.createElement("span");
        
        taskText.textContent = task.title;

        let deleteButton = document.createElement("button");

        deleteButton.textContent = "X";
        deleteButton.classList.add("delete-btn");

        deleteButton.onclick = function () { deleteTask(task.id)};

        li.appendChild(taskText);
        li.appendChild(deleteButton);
        list.appendChild(li);
    })
}
