import {taskData} from "./formSubmit.js"

import {currentProject} from "./new-project.js"

const displayProjectOnScreen = (function() {
    const projectTitleVar = document.getElementById("projectTitleBox");
    let taskVar = taskData.getTasks();
    let currentProjectVar = currentProject.getCurrentProject();


    projectTitleVar.innerText= "Project Title : " + currentProjectVar;

    clearTaskBox();

    taskVar.forEach(function(item) {
        if (item.projectName===currentProjectVar) {
        buildTaskBox(item);
    }})

})

const clearTaskBox = (function() {
    const taskContainer = document.getElementById("allTasks");
    if (taskContainer.hasChildNodes){
    while (taskContainer.hasChildNodes()===true) {
        taskContainer.removeChild(taskContainer.lastChild);
    }}
})

const buildTaskBox = (function(task) {
    const taskContainer = document.getElementById("allTasks");
    const newTask = document.createElement('div');
    newTask.id=task.title;
    newTask.classList="newTaskBox"
    newTask.innerText="Task : " + task.title;

    // priority

    const priorityAlertBar = document.createElement("div");
    const priorityText = document.createElement("div");
    if (task.priority==="Low") {     
        priorityAlertBar.classList="lowAlert"
    } else if (task.priority==="Medium") {
        priorityAlertBar.classList="medAlert";
    } else {
        priorityAlertBar.classList="highAlert";
    }
    priorityText.style.background="white";
    priorityText.innerText=task.priority + " Priority";
    newTask.appendChild(priorityAlertBar);
    priorityAlertBar.appendChild(priorityText);

    // due date

    const dueDateBox = document.createElement("div");
    dueDateBox.innerText="Due Date : " + task.dueDate;
    newTask.appendChild(dueDateBox);

    const details = document.createElement("div");
    details.classList="detailsButton";
    details.innerText="Full details";
    newTask.appendChild(details);

    taskContainer.appendChild(newTask);

})


export {displayProjectOnScreen}