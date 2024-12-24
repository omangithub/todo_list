/*
class newTask {
    constructor (title, description, dueDate, priority) {
        title = title;
        description = description;
        dueDate = dueDate;
        priority = priority;
    }
}
*/



function NewTask (projectName,title,description,dueDate,priority) {
      this.projectName = projectName;
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;

      // setter

/*      set newPriority(updatedpriority) {
        this.priority = updatedpriority;
      } */
}

const taskData = (function () {
    
    let tasks = [];

    const getTasks = (function () {
        return tasks;
    })

    const pushToTasks = (function (task) {
        tasks.push(task);
    })

    return {
        getTasks,
        pushToTasks
    }
})();



export {NewTask, taskData}