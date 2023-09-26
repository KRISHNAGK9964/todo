import fs from "fs";

export async function viewTask({ todoFilePath }) {
  let tasks = [];
  let data = fs.readFileSync(todoFilePath);
  const obj = JSON.parse(data);
//   console.log("obj", obj);
  for (const key in obj) {
    // console.log(obj[`${key}`]);
    tasks.push(obj[`${key}`]);
  }
//   console.log("viewTask", tasks);
  return tasks;
}
