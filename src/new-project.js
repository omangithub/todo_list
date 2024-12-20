import { displayProjectOnScreen } from "./display-tasks-on-screen.js";
import { switchOffOnBack } from "./taskForm.js";

const newProject = (function () {

     let projectsArray = [""];

     const getProjects = (function() {
        return projectsArray
     })

     const addNewProject = (function(newProject) {
 
        projectsArray.push(newProject);;
     })

    const popProjectArray = (function(){
        projectsArray.pop();
    })


     return {
        getProjects,
        addNewProject,
        popProjectArray
     }
})();


const currentProject = (function() {

    let currentProjectValue = "Default_Project"

    const getCurrentProject = (function() {
        return currentProjectValue
    })

    const updateCurrentProject = (function(e) {
        currentProjectValue = e;
    })

    return {getCurrentProject, updateCurrentProject}

})();

const updateDisplayedProject = (function() {

    let projectArray = newProject.getProjects();
    const projectSpace = document.getElementById("projectBox");


    while (projectSpace.hasChildNodes()===true) {
        projectSpace.removeChild(projectSpace.lastChild);
        console.log("child")
    }

    if (projectArray[0]==="") {
        newProject.popProjectArray();
        newProject.addNewProject("Default_Project");
        console.log(projectArray)

    }
    
    for (let i=0;i<=projectArray.length;i++) {
        let currentProj = currentProject.getCurrentProject();
        if (projectArray[i]) {
        let newProj = document.createElement("div");
        newProj.classList="projectBoxes";
        newProj.innerText=projectArray[i];
        if (projectArray[i]!=="Default_Project") {
            newProj.id=projectArray[i];
        }else{
            newProj.id="Default_Project";
        }
        newProj.addEventListener("click", (e)=>{
            currentProject.updateCurrentProject(e.target.id);
            updateDisplayedProject();
            displayProjectOnScreen();
        })
        projectSpace.appendChild(newProj)
        if(projectArray[i]===currentProj) {
            const currentProjectBorder = document.getElementById(projectArray[i]);    
            currentProjectBorder.style.border="5px red solid";
        }
    }}

})


const submitProjectName = (function() {
    const newProjectEntry = document.getElementById("projectNameId");
    const alertMessage = document.getElementById("projectDescText");

    let taskNumber = 0;

    if (newProjectEntry.value!=="") {
        let project = newProjectEntry.value;
        newProject.addNewProject(project);
        removeProjectBox();
        switchOffOnBack();
        console.log(newProject.getProjects())
    } else {
        alertMessage.innerText="You cannot submit unless you have entered a project name."
    }

})

const removeProjectBox = (function () {
    const bodyBox = document.getElementById("body");
    const blurBackgroundBox = document.getElementById("blurBackground");
    const form = document.getElementById("newProjectBox")

    while (bodyBox.hasChildNodes===true) {
        bodyBox.removeChild(bodyBox.lastChild);
    }

    bodyBox.removeChild(blurBackgroundBox);
    bodyBox.removeChild(form);
})

const getUserProjectName = (function() {

    const blurBackgroundBox = document.getElementById("body")
    const projectNameBox = document.createElement("div");
    projectNameBox.style.position="absolute";
    projectNameBox.style.background="white";
    projectNameBox.style.top = "10%";
    projectNameBox.style.left= "40%";
    projectNameBox.style.zIndex = "1"
    projectNameBox.id="newProjectBox"
    blurBackgroundBox.appendChild(projectNameBox);


    const formTitle = document.createElement("div");
    formTitle.innerText="New Project";
    formTitle.classList="formTitle";

    const formText = document.createElement("div");
    formText.innerText="Please submit a name for the new project.";
    formText.classList="formDescription";
    formText.id="projectDescText"

    const questionPrompts = document.createElement("form");
    questionPrompts.classList="form";
    questionPrompts.id="projectForm"


    const titleText = document.createElement("p");
    titleText.innerText="Project Name";
    titleText.classList="fieldTitle";

    const projectInput = document.createElement("input");
    projectInput.setAttribute("type", "text");
    projectInput.setAttribute("name", "ProjectName");
    projectInput.style.height="30px";
    projectInput.id="projectNameId";


    projectNameBox.appendChild(formTitle);
    projectNameBox.appendChild(formText);
    projectNameBox.appendChild(questionPrompts);

    questionPrompts.appendChild(titleText);
    questionPrompts.appendChild(projectInput);


    const buttonBox = document.createElement("div");
    buttonBox.id="formButtonsBox"

    const submitInput = document.createElement("div");
    submitInput.classList="twoFormButton";
    submitInput.innerText="Submit";
    submitInput.id="submitProjectForm";
    submitInput.addEventListener("click",()=>{
        submitProjectName();
        updateDisplayedProject();
        displayProjectOnScreen();
    })


    const cancelInput = document.createElement("div");
    cancelInput.classList="twoFormButton";
    cancelInput.innerText="Cancel";
    cancelInput.id="cancelProjectForm";
    cancelInput.addEventListener("click",()=>{
        switchOffOnBack();
        removeProjectBox();
    })

    projectNameBox.appendChild(buttonBox)
    buttonBox.appendChild(submitInput);
    buttonBox.appendChild(cancelInput);


});

export {newProject, getUserProjectName, updateDisplayedProject, currentProject}