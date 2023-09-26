import fs from 'fs';

export function addTask({description,dueDate,todoFilePath,TaskBuilder,uniqueId}){
    const taskId = uniqueId();
    console.log(description , dueDate , taskId,todoFilePath);
    
    const newTask = new TaskBuilder(description,taskId).setDueDate(dueDate).setCompleted(false).build();
    console.log(newTask);
    fs.readFile(todoFilePath,(err , data)=>{
        if(err){
            console.log("Err",err);
            return;
        }
        console.log("data",data);
        let obj = JSON.parse(data);
        console.log(obj);
        console.log(taskId);
        obj[`${taskId}`] = newTask;
        console.log("obj",obj);
        obj = JSON.stringify(obj);
        fs.writeFileSync(todoFilePath,obj);
    });
}

// addTask({description:"do homework" , dueDate:Date.now() , todoFilePath:todoFilePath});