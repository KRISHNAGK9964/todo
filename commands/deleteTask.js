import fs from 'fs';

export function deleteTask({taskId,todoFilePath }){
    fs.readFile(todoFilePath,(err,data)=>{
        if(err) return err;

        const obj = JSON.parse(data);
        console.log("obj",obj);
        delete obj[`${taskId}`];
        fs.writeFileSync(todoFilePath,JSON.stringify(obj));
    })
}