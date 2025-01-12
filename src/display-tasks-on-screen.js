import { whichThreeEndSoonest } from "./endsoon.js";
import {taskData} from "./formSubmit.js";
import {currentProject} from "./new-project.js";
import { format } from "date-fns";

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

    console.log(taskVar)
    whichThreeEndSoonest(taskVar);
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

    const dueDateBox = document.createElement("div");
    dueDateBox.innerText="Due Date : " + task.dueDate;
    newTask.appendChild(dueDateBox);

    const details = document.createElement("div");
    details.classList="detailsButton";
    details.innerText="Full details";
    details.id=task.title + "details"
    details.addEventListener("click",(e) => {
        const blurBack = document.getElementById("blurBackground");
        blurBack.classList.toggle("hidden");
        fullDetailsPopUp(e.target.id);
    })
    newTask.appendChild(details);

    taskContainer.appendChild(newTask);

})

const fullDetailsPopUp = (function(targetid) {

    let pulledTask = {};

    let taskVar = taskData.getTasks();

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
    taskDueDateBox.innerText="Due Date : " + format(new Date(pulledTask.dueDate), "PPP")

    const taskDescription = document.createElement("div");
    taskDescription.innerText="Description : " + pulledTask.description;

    taskDetailsBox.appendChild(taskTitle);
    taskDetailsBox.appendChild(taskDueDateBox);
    taskDetailsBox.appendChild(taskDescription);

    const priorityTitle = document.createElement("div");
    priorityTitle.id = "PriorTitle";
    priorityTitle.innerText="Level of Priority :";
    taskDetailsBox.appendChild(priorityTitle);


    const priorityLevelBox = document.createElement("div");
    priorityLevelBox.id = "priorityLevelBox";
    taskDetailsBox.appendChild(priorityLevelBox);

    const priorityIndicator = document.createElement("div");
    priorityIndicator.innerText="^";
    priorityIndicator.style.width="70%";
    priorityTitle.style.height="20px"
    if (pulledTask.priority==="Low") {
        priorityIndicator.id="lowPriorityIndicator";
    } else if (pulledTask.priority==="Medium") {
        priorityIndicator.id="medPriorityIndicator";
    }else {
        priorityIndicator.id="highPriorityIndicator";
    }

    const lowPriorityColor = document.createElement("div");
    lowPriorityColor.id = "lowPriorColor";
    lowPriorityColor.innerText="Low"
    lowPriorityColor.addEventListener("click", (e) => {
    priorityIndicator.id="lowPriorityIndicator";
    pulledTask.priority="Low"
    })
    priorityLevelBox.appendChild(lowPriorityColor);

    const medPriorityColor = document.createElement("div");
    medPriorityColor.id = "medPriorColor";
    medPriorityColor.innerText="Medium";
    medPriorityColor.addEventListener("click", (e) => {
        priorityIndicator.id="medPriorityIndicator";
        pulledTask.priority="Medium"
        })
    priorityLevelBox.appendChild(medPriorityColor);

    const highPriorityColor = document.createElement("div");
    highPriorityColor.id = "highPriorColor";
    highPriorityColor.innerText="high";
    highPriorityColor.addEventListener("click", (e) => {
        priorityIndicator.id="highPriorityIndicator";
        pulledTask.priority="High"
    })
    priorityLevelBox.appendChild(highPriorityColor);

    taskDetailsBox.appendChild(priorityIndicator);

    const deleteToDo = document.createElement("div");
    deleteToDo.classList="twoFormButton";
    deleteToDo.innerText="Delete ToDo";
    deleteToDo.addEventListener("click", ()=> {
        taskData.removeTask(taskId);
        removeDetailsBox();
        displayProjectOnScreen();
    })
    taskDetailsBox.appendChild(deleteToDo);


    const closeTaskDetails = document.createElement("div");
    closeTaskDetails.classList="twoFormButton";
    closeTaskDetails.innerText="Close";
    closeTaskDetails.id="closeTaskDetails";
    closeTaskDetails.addEventListener("click",()=>{
        removeDetailsBox();
        displayProjectOnScreen();
        const blurBack = document.getElementById("blurBackground");
        blurBack.classList.toggle("hidden");
    })


    taskDetailsBox.appendChild(closeTaskDetails);

    const getPulledTask = (function() {
        return pulledTask
    })

    return {
        getPulledTask
    }

})

const removeDetailsBox = (function () {

    const bodyBox = document.getElementById("body");
    const taskBox = document.getElementById("detailsBox");

    while (taskBox.hasChildNodes===true) {
        taskBox.removeChild(taskBox.lastChild);
    }

    bodyBox.removeChild(taskBox)
})

export {displayProjectOnScreen, fullDetailsPopUp}