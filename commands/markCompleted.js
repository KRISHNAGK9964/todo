import fs from 'fs';

export function markCompleted({taskId,todoFilePath }){
    fs.readFile(todoFilePath,(err,data)=>{
        if(err) return err;

        const obj = JSON.parse(data);
        // console.log("obj",obj);
        obj[`${taskId}`].completed = true;
        fs.writeFileSync(todoFilePath,JSON.stringify(obj));
    })
}