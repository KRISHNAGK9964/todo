export class Task {
    constructor(description, id){
        this.description = description;
        this.id = id;
    }

}

export class TaskBuilder{

    constructor(description,id){
        this.Task = new Task(description,id);
    }

    setDueDate(Date){
        this.Task.dueDate = Date;
        return this;
    }

    setCompleted(){
        this.Task.completed = true;
        return this;
    }

    build(){
        return this.Task;
    }
}

// const task = new TaskBuilder("drint tea",1).build();
// console.log(task);
// task.description = 'hi';
// console.log(task);

// export default {
//     Task,TaskBuilder
// }