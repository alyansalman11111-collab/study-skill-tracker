function addSkill()
{
    let input = document.getElementById("AddSkill");
    let skill = input.value;

    if(skill == "")
        return;

    let list = document.getElementById("skillList");

    let li = document.createElement("li");
    li.textContent = skill;

    list.appendChild(li);

    input.value = "";
}
