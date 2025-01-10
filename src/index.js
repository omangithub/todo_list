import "./styles.css"

import {deleteProjectBox} from "./deleteproject.js";

import{storeProject, alertBoxCannotStore, retrieveProjectsBox} from "./storage.js";

import { blurBackground } from "./blur-background.js";

import {startUpSampleProject, questionBox} from "./taskForm.js";

import {getUserProjectName, updateDisplayedProject} from "./new-project.js";

import {displayProjectOnScreen} from "./display-tasks-on-screen.js"


const onLoadScreen = (function() {

    //prepare projects

    updateDisplayedProject();
    startUpSampleProject();
    displayProjectOnScreen();
    blurBackground();
    questionBox();
    alertBoxCannotStore();
    deleteProjectBox();
    retrieveProjectsBox();
    storeProject();
    getUserProjectName();


    const blurBack = document.getElementById("blurBackground");
    const newProBox = document.getElementById("newProjectBox");
    const openQuestionBox = document.getElementById("questions")
    const storeProBox = document.getElementById("alertBox");
    const retProBox = document.getElementById("retrieveProjectBox");
    const delProBox = document.getElementById("deleteProjectCont");
    blurBack.classList.toggle("hidden");

    const createProjectButton = document.getElementById("createProject");

    createProjectButton.addEventListener("click", ()=> {
        blurBack.classList.toggle("hidden");
        newProBox.classList.toggle("hidden");
        newProBox.classList.toggle("positionAbsolute");
    })

    const createTaskButton = document.getElementById("newTask");  

    createTaskButton.addEventListener("click", ()=>{
        blurBack.classList.toggle("hidden");
        openQuestionBox.classList.toggle("hidden");
        openQuestionBox.classList.toggle("positionAbsolute");
    })

    const saveProjectsButton = document.getElementById("saveProjects");

    saveProjectsButton.addEventListener("click", ()=>{
        blurBack.classList.toggle("hidden");
        storeProBox.classList.toggle("hidden");
        storeProBox.classList.toggle("positionAbsolute");
        displayProjectOnScreen();
    })

    const retrieveProjectsButton = document.getElementById("retrieveProjects");

    retrieveProjectsButton.addEventListener("click", ()=> {
        blurBack.classList.toggle("hidden");
        retProBox.classList.toggle("hidden");
        retProBox.classList.toggle("positionAbsolute");

    })

    const deleteProjectButton = document.getElementById("deleteProject");

    deleteProjectButton.addEventListener("click", ()=> {
        blurBack.classList.toggle("hidden");
        delProBox.classList.toggle("hidden");
        delProBox.classList.toggle("positionAbsolute");

    })

})();