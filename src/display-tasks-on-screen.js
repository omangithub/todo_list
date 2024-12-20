import {taskData} from "./formSubmit.js"

import {currentProject} from "./new-project.js"

const displayProjectOnScreen = (function() {
    const projectTitleVar = document.getElementById("projectTitleBox");
    let taskVar = taskData.getTasks();
    let currentProjectVar = currentProject.getCurrentProject();


    projectTitleVar.innerText= "Project Title : " + currentProjectVar;

    clearTaskBox();

    taskVar.forEach(function(item) {
        buildTaskBox(item);
    })

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
    newTask.innerText=task.title;
    taskContainer.appendChild(newTask);

})


export {displayProjectOnScreen}