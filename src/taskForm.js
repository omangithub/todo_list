import { displayProjectOnScreen } from "./display-tasks-on-screen.js";
import {NewTask, taskData} from "./formSubmit.js";
import { currentProject } from "./new-project.js";

const switchBetweenBackgroundOnOrOff = (function() {

    let turnOffBackgroundFunctions=false
    const blurBackgroundBox = document.getElementById("blurBackground")

    const backgroundSwitch = (function() {
    if (turnOffBackgroundFunctions===false) {
        turnOffBackgroundFunctions=true;

    } else {
        turnOffBackgroundFunctions=false;
    }})


    const getBackgroundVar = (function () {
        return turnOffBackgroundFunctions
    })

    return {
        getBackgroundVar,
        backgroundSwitch
    }
})();

const backgroundVar = (function () {
    return switchBetweenBackgroundOnOrOff.getBackgroundVar();
})

const switchOffOnBack = (function () {
    return switchBetweenBackgroundOnOrOff.backgroundSwitch();
})

const removeQuestionBox = (function () {
    const bodyBox = document.getElementById("body");
    const blurBackgroundBox = document.getElementById("blurBackground");
    const form = document.getElementById("questions")

    while (bodyBox.hasChildNodes===true) {
        bodyBox.removeChild(bodyBox.lastChild);
    }

    bodyBox.removeChild(blurBackgroundBox);
    bodyBox.removeChild(form);
})


const questionBox = (function () {

    const blurBackgroundBox = document.getElementById("body")
  const newContainer = document.createElement("div");
  newContainer.style.position="absolute";
  newContainer.style.background="white";
  newContainer.style.top = "10%";
  newContainer.style.left= "40%";
  newContainer.style.zIndex = "1"
  newContainer.id="questions"
  blurBackgroundBox.appendChild(newContainer);

    // create question boxes for form title, description, dueDate and priority


    const formTitle = document.createElement("div");
    formTitle.innerText="New Task";
    formTitle.classList="formTitle";

    const formText = document.createElement("div");
    formText.innerText="Please fill in each of the fields below and press submit.";
    formText.classList="formDescription";
    formText.id="newTaskDesc"
    formText.style.padding="10px";

    const questionPrompts = document.createElement("form");
    questionPrompts.classList="form";
    questionPrompts.id="taskForm"
    newContainer.appendChild(questionPrompts);

    const titleText = document.createElement("p");
    titleText.innerText="Title";
    titleText.classList="fieldTitle";

    const titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("name", "Title");
    titleInput.style.height="30px";
    titleInput.id="titleId"


    const descText = document.createElement("p");
    descText.innerText="Description of task";
    descText.classList="fieldTitle";

    const descriptionInput = document.createElement("input");
    descriptionInput.setAttribute("type", "text");
    descriptionInput.setAttribute("name", "Description");
    descriptionInput.id="descId"
    descriptionInput.style.height="100px";


    const dueText = document.createElement("p");
    dueText.innerText="Due date";
    dueText.classList="fieldTitle";

    const dueInput = document.createElement("input");
    dueInput.setAttribute("type", "date");
    dueInput.setAttribute("name", "Due date");
    dueInput.setAttribute("placeholder", "01-01-2000")
    dueInput.id="dueId"
    dueInput.style.height="100px";

    const priorText = document.createElement("div");
    priorText.innerText="Priority";
    priorText.classList="fieldTitle";

    const priorityInput = document.createElement("select");
    const option1 = document.createElement("option");
    option1.value= "High";
    option1.text="High";
    priorityInput.appendChild(option1);
    const option2 = document.createElement("option");
    option2.value="Medium";
    option2.text="Medium";
    priorityInput.appendChild(option2);
    const option3 = document.createElement("option");
    option3.value ="Low";
    option3.text="Low";
    priorityInput.appendChild(option3);
    priorityInput.id="priorityId"
    priorityInput.style.height="30px";


    const buttonBox = document.createElement("div");
    buttonBox.id="formButtonsBox"

    const submitInput = document.createElement("div");
    submitInput.classList="twoFormButton";
    submitInput.innerText="Submit";
    submitInput.id="submitForm";
    submitInput.addEventListener("click",()=>{
        formSubmit();
        displayProjectOnScreen();
    })


    const cancelInput = document.createElement("div");
    cancelInput.classList="twoFormButton";
    cancelInput.innerText="Cancel";
    cancelInput.id="cancelForm";
    cancelInput.addEventListener("click",()=>{
        formCancel();
    })


    newContainer.appendChild(formTitle);
    newContainer.appendChild(formText);
    newContainer.appendChild(questionPrompts);
    questionPrompts.appendChild(titleText);
    questionPrompts.appendChild(titleInput);
    questionPrompts.appendChild(descText);
    questionPrompts.appendChild(descriptionInput);
    questionPrompts.appendChild(dueText);
    questionPrompts.appendChild(dueInput);
    questionPrompts.appendChild(priorText);
    questionPrompts.appendChild(priorityInput);
    questionPrompts.appendChild(buttonBox);
    buttonBox.appendChild(submitInput);
    buttonBox.appendChild(cancelInput);

});

// form submission

const formSubmit = (function () {
    const titleEntry = document.getElementById("titleId");
    const descEntry = document.getElementById("descId");
    const dueEntry = document.getElementById("dueId");
    const priorityEntry = document.getElementById("priorityId");
    const alertMessage = document.getElementById("newTaskDesc");
    let projectName=currentProject.getCurrentProject();

    let taskNumber = 0;

    if (titleEntry.value!=="" && descEntry.value!=="" && dueEntry.value!== "" && priorityEntry.value!=="") {
        let task = new NewTask (projectName,titleEntry.value,descEntry.value,dueEntry.value,priorityEntry.value);
        taskData.pushToTasks(task);
        removeQuestionBox();
        switchOffOnBack();
        console.log(taskData.getTasks())
    } else {
        alertMessage.innerText="You cannot submit unless you have filled in all of the fields below."
    }

})


const startUpSampleProject = (function () {
    let projectName="Default_Project";

    let sampleTask = new NewTask (projectName,"Sample","This is a sample","30-12-2100","Low");
    taskData.pushToTasks(sampleTask);
    console.log(taskData.getTasks())

})


const formCancel = (function() {
    removeQuestionBox();
    switchOffOnBack();
})

export {questionBox, switchOffOnBack, backgroundVar, removeQuestionBox, formCancel, startUpSampleProject}