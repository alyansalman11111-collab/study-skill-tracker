let tasks = [];

function addSkill()
{
    let input = document.getElementById("addSkill");
    let skill = input.value.trim();

    if(skill == "")
        return;

    tasks.push({id: Date.now(), title: skill, completed: false});

    input.value = "";
    rendertasks();
}

function rendertasks()
{
    let list = document.getElementById("skillList");
    list.innerHTML = "";

    tasks.forEach(task => {let li = document.createElement("li"); li.textContent = task.title; list.appendChild(li);});
}
