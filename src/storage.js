import { blurBackground } from "./blur-background.js";
import { displayProjectOnScreen } from "./display-tasks-on-screen.js";
import {taskData} from "./formSubmit.js"
import { newProject, updateDisplayedProject } from "./new-project.js";
import { switchOffOnBack } from "./taskForm.js";

export const storeProject = () => {
    let projectsForStorage = taskData.getTasks();

    projectsForStorage.forEach((item) => { 

    let storageNumber = localStorage.length+1;

    const projectTasks = {
        title : item.title,
        projectName : item.projectName,
        description : item.description,
        dueDate : item.dueDate,
        priority : item.priority
}
    checkIfTitleExistsInStorage.checkIfExistsInStorage(projectTasks.title)
    let currentlyInStorage = checkIfTitleExistsInStorage.getExistsInStorage();
    if (!currentlyInStorage) {
    localStorage.setItem(storageNumber, JSON.stringify(projectTasks));
}else{
    blurBackground();
    console.log("Create an alert");
    checkIfTitleExistsInStorage.resetExistsInStorage();
}})

};

const retrieveProjects = (function() {

    let importedProjects = [];
    
    const pullProjectsFromStorage = (function() { 

        let numberOfStoredItems = localStorage.length;

        for (let i=1;i<=numberOfStoredItems;i++) {
        let pulledProject = JSON.parse(localStorage.getItem(i));
        const retrievedTasks = {
            title : pulledProject.title,
            projectName : pulledProject.projectName,
            description : pulledProject.description,
            dueDate : pulledProject.dueDate,
            priority : pulledProject.priority
        }
        pushimportedprojects(retrievedTasks);
    }
    })

    const pushSavedProjectToCurrentProjects = (function(project) {
      newProject.addNewProject(project)
    })

    const getImportedProjects = (function() {
        return importedProjects
    })

    const pushimportedprojects = (function(project) {
        importedProjects.push(project)
    })

    const removefromImportedProjects = (function(project) {
        importedProjects.splice(project, 1)
    })

    return {
        getImportedProjects,
        pullProjectsFromStorage,
        removefromImportedProjects,
        pushimportedprojects,
        pushSavedProjectToCurrentProjects
    }
})();

const checkIfTitleExistsInStorage = (function () {

    let currentStorageArray = retrieveProjects.getImportedProjects();

    let existsInStorage = false;

retrieveProjects.pullProjectsFromStorage();

console.log(currentStorageArray)

    const checkIfExistsInStorage = (function(title) {
        for (let i=0;i<localStorage.length;i++) {
            if (currentStorageArray[i].title===title) {
                existsInStorage=true;
            }
    }})

    const resetExistsInStorage = (function() {
        existsInStorage=false;
    })

    const getExistsInStorage = (function() {
        return existsInStorage
    })

    return {
        checkIfExistsInStorage,
        resetExistsInStorage,
        getExistsInStorage
    }

})();


export const retrieveProjectsBox = (function() {

    const blurBackgroundBox = document.getElementById("body")
    const retrieveProjectsBox = document.createElement("div");
    retrieveProjectsBox.style.position="absolute";
    retrieveProjectsBox.style.background="white";
    retrieveProjectsBox.style.top = "10%";
    retrieveProjectsBox.style.left= "40%";
    retrieveProjectsBox.style.zIndex = "1"
    retrieveProjectsBox.id="retrieveProjectBox"
    blurBackgroundBox.appendChild(retrieveProjectsBox);

    const retrieveText = document.createElement("div");
    retrieveText.innerText="Choose the project you wish to import.";
    retrieveText.classList="formDescription";
    retrieveText.id="projectDescText";

    retrieveProjectsBox.appendChild(retrieveText);

    //box for saved tasks


    const containerForSavedProjects = document.createElement("div");
    containerForSavedProjects.id="savedProjectContainer";

    retrieveProjectsBox.appendChild(containerForSavedProjects);

    savedProjectList()

    const importButtonBox = document.createElement("div");
    importButtonBox.classList="twoFormButton";
    importButtonBox.innerText="Import";
    importButtonBox.id="importForm";
    importButtonBox.addEventListener("click",()=>{
        let currentProjectId = currentlySelectedSavedProject.getSelectedSavedProject();
        let thisProject = JSON.parse(localStorage.getItem(currentProjectId));
        const retrievedTasks = {
            title : thisProject.title,
            projectName : thisProject.projectName,
            description : thisProject.description,
            dueDate : thisProject.dueDate,
            priority : thisProject.priority
        };
        let projectsArray = newProject.getProjects()
        if (!projectsArray.includes(retrievedTasks.projectName)) {
            newProject.addNewProject(retrievedTasks.projectName)
        updateDisplayedProject()
        }
        taskData.pushToTasks(retrievedTasks);
        localStorage.removeItem(currentProjectId);
        savedProjectList();
        displayProjectOnScreen()
    })

    retrieveProjectsBox.appendChild(importButtonBox)

    const clearSavedBox = document.createElement("div");
    clearSavedBox.classList="twoFormButton";
    clearSavedBox.innerText="Clear Storage";
    clearSavedBox.id="cancelProjectForm";
    clearSavedBox.addEventListener("click",()=>{
        clearStorage();
        currentlySelectedSavedProject.updateSelectedSavedProject("");
        savedProjectList();
    })
    
    retrieveProjectsBox.appendChild(clearSavedBox)

    const closeBox = document.createElement("div");
    closeBox.classList="twoFormButton";
    closeBox.innerText="Close";
    closeBox.id="cancelProjectForm";
    closeBox.addEventListener("click",()=>{
        switchOffOnBack();
        removeStorageBox();
    })

    retrieveProjectsBox.appendChild(closeBox)
})

const currentlySelectedSavedProject = (function() {
    let currentlySelectedSavedProjectVar = "";

    const updateSelectedSavedProject = (function(e) {
        currentlySelectedSavedProjectVar=e
    })

    const getSelectedSavedProject = (function() {
        return currentlySelectedSavedProjectVar
    })

    return {
        updateSelectedSavedProject,
        getSelectedSavedProject
    }
})()

const savedProjectList = (function() {
     
    let currentProject = currentlySelectedSavedProject.getSelectedSavedProject();

    let containerForSavedProjects = document.getElementById("savedProjectContainer")

    while (containerForSavedProjects.hasChildNodes()===true) {
        containerForSavedProjects.removeChild(containerForSavedProjects.lastChild);
    }
    // find all instances of saved projects and upload them

    for (let i=1;i<=localStorage.length;i++) {
        console.log(localStorage.getItem(i))
        let allProjects = retrieveProjects.getImportedProjects();
        if (localStorage.getItem(i)) {
        let pulledProject = JSON.parse(localStorage.getItem(i));
        const retrievedTasks = {
            title : pulledProject.title,
            projectName : pulledProject.projectName,
            description : pulledProject.description,
            dueDate : pulledProject.dueDate,
            priority : pulledProject.priority
        }
        const savedProject = document.createElement("div");
        savedProject.id=i
        savedProject.classList="savedProject"
        savedProject.innerText="Project Title : " + retrievedTasks.title;
        if (currentProject===savedProject.id) {
            savedProject.style.border = "red solid 2px"
        }
        savedProject.addEventListener("click",(e)=>{
            currentlySelectedSavedProject.updateSelectedSavedProject(e.target.id);


    console.log('hello')
            savedProjectList();
        })  
        retrieveProjects.pushimportedprojects(retrievedTasks)
        containerForSavedProjects.appendChild(savedProject);         
    }}})

const clearStorage = () => {
    localStorage.clear();
}

const removeStorageBox = (function () {
    const bodyBox = document.getElementById("body");
    const blurBackgroundBox = document.getElementById("blurBackground");
    const form = document.getElementById("retrieveProjectBox")

    while (form.hasChildNodes===true) {
        form.removeChild(form.lastChild);
    }

    while (bodyBox.hasChildNodes===true) {
        bodyBox.removeChild(bodyBox.lastChild);
    }

    bodyBox.removeChild(blurBackgroundBox);
    bodyBox.removeChild(form);
})
