import { compareAsc, format } from "date-fns";

const whichThreeEndSoonest = (function(tasks) {
    
    let dates = [];
    let alltasks = tasks;

    clearEndSoonestBox();

    for (let i=0;i<alltasks.length;i++) {
      format(new Date(alltasks[i].dueDate), "MM/dd/yyyy");
    
      dates[i] = [
        new Date(alltasks[i].dueDate),
        ];
    dates.sort(compareAsc);

}
    if (alltasks[0]) {
    alltasks.forEach(function (item) {
        if (item.dueDate===format(new Date(dates[0]), "yyyy-MM-dd")) {
            buildEndingSoonBox(item)
    }})};


    if (alltasks[1]) {
    alltasks.forEach(function (item) {
        if (item.dueDate===format(new Date(dates[1]), "yyyy-MM-dd")) {
            buildEndingSoonBox(item)
    }})};

    if(alltasks[2]) {
    alltasks.forEach( function (item) {
        if (item.dueDate===format(new Date(dates[2]), "yyyy-MM-dd")) {
            buildEndingSoonBox(item)
    }})};
})

const clearEndSoonestBox = (function() {
    const taskContainer = document.getElementById("endingSoonest");
    if (taskContainer.hasChildNodes){
    while (taskContainer.hasChildNodes()===true) {
        taskContainer.removeChild(taskContainer.lastChild);
    }}
})


const buildEndingSoonBox = (function(task) {

    

    const taskContainer = document.getElementById("endingSoonest");
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

export {whichThreeEndSoonest}