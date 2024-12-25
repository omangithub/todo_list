import {taskData} from "./formSubmit.js"

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
    localStorage.setItem(storageNumber, JSON.stringify(projectTasks));
})
    console.log(localStorage)
};

export const retrieveProjects = () => {

    let importedProjects = {}
   
    const pullProjectsFromStorage = (function() { 

        let numberOfStoredItems = localStorage.length;

        for (let i=1;i<=numberOfStoredItems;i++) {
        let pulledProject = JSON.parse(localStorage.getItem(i));
        console.log(pulledProject)
        const retrievedTasks = {
            title : pulledProject.title,
            projectName : pulledProject.projectName,
            description : pulledProject.description,
            dueDate : pulledProject.dueDate,
            priority : pulledProject.priority
        }
        importedProjects.push(retrievedTasks);
}
    })

    const getImportedProjects = (function() {
        return importedProjects
    })

    return {
        getImportedProjects,
        pullProjectsFromStorage
    }
}

export const retrieveProjectsBox = (function() {
    
    let importedProjects = retrieveProjects.getImportedProjects;


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

})

export const clearStorage = () => {
    localStorage.clear();
}