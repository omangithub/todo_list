import { blurBackground } from "./blur-background.js";
import {taskData} from "./formSubmit.js"
import { switchOffOnBack } from "./taskForm.js";
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
    details.id=task.title + "details"
    details.addEventListener("click",(e) => {
        console.log(e.target.id)
        switchOffOnBack();
        blurBackground();
        fullDetailsPopUp(e.target.id);
        console.log ("details screen")
    })
    newTask.appendChild(details);

    taskContainer.appendChild(newTask);

})

const fullDetailsPopUp = (function(targetid) {

    let taskVar = taskData.getTasks();

    let pulledTask = {};

    let taskId = targetid.replace ("details", "");

    taskVar.forEach((function(item) {
     
        if (taskId===item.title) {
            pulledTask = item;
        }
    }))

    const blurBackgroundBox = document.getElementById("body")
    const taskDetailsBox = document.createElement("div");
    taskDetailsBox.style.position="absolute";
    taskDetailsBox.style.background="white";
    taskDetailsBox.style.top = "10%";
    taskDetailsBox.style.left= "40%";
    taskDetailsBox.style.zIndex = "1"
    taskDetailsBox.id="detailsBox"
    blurBackgroundBox.appendChild(taskDetailsBox);

    const taskTitle = document.createElement('div');
    taskTitle.innerText="Task : " + pulledTask.title;
    const taskDueDateBox = document.createElement("div");
    taskDueDateBox.innerText="Due Date : " + pulledTask.dueDate;

    const taskDescription = document.createElement("div");
    taskDescription.innerText="Description : " + pulledTask.description;

    taskDetailsBox.appendChild(taskTitle);
    taskDetailsBox.appendChild(taskDueDateBox);
    taskDetailsBox.appendChild(taskDescription);

    const editPriority = document.createElement("div");
    editPriority.classList="twoFormButton";
    editPriority.innerText="Edit Priority";
    editPriority.id="editPriorityButton";
    editPriority.addEventListener("click",()=>{
    console.log("edit priority");
    })


    const closeTaskDetails = document.createElement("div");
    closeTaskDetails.classList="twoFormButton";
    closeTaskDetails.innerText="Close";
    closeTaskDetails.id="closeTaskDetails";
    closeTaskDetails.addEventListener("click",()=>{
        switchOffOnBack();
        removeDetailsBox();
    })

    taskDetailsBox.appendChild(editPriority);
    taskDetailsBox.appendChild(closeTaskDetails);
})

const removeDetailsBox = (function () {
    const bodyBox = document.getElementById("body");
    const blurBackgroundBox = document.getElementById("blurBackground");
    const taskBox = document.getElementById("detailsBox")

    while (taskBox.hasChildNodes===true) {
        taskBox.removeChild(taskBox.lastChild);
    }


    bodyBox.removeChild(blurBackgroundBox);
    bodyBox.removeChild(taskBox)
})

export {displayProjectOnScreen}