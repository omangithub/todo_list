import { currentProject, newProject, updateDisplayedProject } from "./new-project.js";

import { taskData } from "./formSubmit.js";

import {displayProjectOnScreen} from "./display-tasks-on-screen.js"

import { removeBox } from "./taskForm.js";

export const deleteProjectBox = (function() {
    

    const blurBackgroundBox = document.getElementById("body")
    const deleteProjectContainer = document.createElement("div");
    deleteProjectContainer.classList="hidden, positionAbsolute";
    deleteProjectContainer.classList.toggle("positionAbsolute");
    deleteProjectContainer.style.background="white";
    deleteProjectContainer.style.top = "10%";
    deleteProjectContainer.style.left= "40%";
    deleteProjectContainer.style.zIndex = "1"
    deleteProjectContainer.id="deleteProjectCont"
    blurBackgroundBox.appendChild(deleteProjectContainer);

    const formText = document.createElement("div");
    formText.innerText="Are you sure? This will also delete all tasks from this project.";
    formText.classList="formDescription";
    formText.id="projectDescText"
    deleteProjectContainer.appendChild(formText);

    const confirmDeleteButton = document.createElement("div");
    confirmDeleteButton.classList="twoFormButton";
    confirmDeleteButton.innerText="Confirm";
    confirmDeleteButton.id="confirmButton";
    confirmDeleteButton.addEventListener("click",()=>{
    deleteProjectFunc();
    removeBox("deleteProjectCont");
    updateDisplayedProject();
    displayProjectOnScreen();
})


    const closeDeleteProjButton = document.createElement("div");
    closeDeleteProjButton.classList="twoFormButton";
    closeDeleteProjButton.innerText="Cancel";
    closeDeleteProjButton.id="closeDelForm";
    closeDeleteProjButton.addEventListener("click",()=>{
    removeDeleteBox();
    switchOffOnBack();
    })


    deleteProjectContainer.appendChild(confirmDeleteButton)
    deleteProjectContainer.appendChild(closeDeleteProjButton);

})

const deleteProjectFunc = (function() {

    let projectArray = newProject.getProjects();
    let projectToDelete = currentProject.getCurrentProject();
    let tasks = taskData.getTasks();

    // delete from projects
    console.log(projectArray)
    newProject.deleteFromProjectArray(projectToDelete);
    taskData.removeProject(projectToDelete)
    console.log(projectArray);

    // delete from tasks


})

const removeDeleteBox = (function () {
    const bodyBox = document.getElementById("body");
    const blurBackgroundBox = document.getElementById("blurBackground");
    const form = document.getElementById("deleteProjectCont");

    while (form.hasChildNodes===true) {
        form.removeChild(form.lastChild);
    }

    while (bodyBox.hasChildNodes===true) {
        bodyBox.removeChild(bodyBox.lastChild);
    }

    bodyBox.removeChild(blurBackgroundBox);
    bodyBox.removeChild(form);
})
