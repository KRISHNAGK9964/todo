#!/usr/bin/env node
import fs from "fs";
import { greetUser } from "./greet.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import os from "os";
import { addTask } from "./commands/addTask.js";
import { TaskBuilder, Task } from "./taskBuilder.js";
import { uniqueId } from "./utility/uniqueId.js";
import inquirer from "inquirer";
import { help } from "./commands/help.js";
import { viewTask } from "./commands/viewTask.js";
import { markCompleted } from "./commands/markCompleted.js";
import { deleteTask } from "./commands/deleteTask.js";
import DatePrompt from "inquirer-date-prompt";

const argv = process.argv;
const input = argv;
// console.log(input);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// console.log(__dirname,__filename);
export const todoFilePath = __dirname + "\\todo.json";
const completedFilePath = __dirname + "\\completed.json";

if (fs.existsSync(todoFilePath) == false) {
  const username = os.userInfo().username;
  console.log("user", username);
  greetUser(username);
  let obj = {};
  let emptyjson = JSON.stringify(obj);
  fs.writeFileSync(todoFilePath,emptyjson);
}

// greetUser("k");
// addTask({description:"do homework" , dueDate:Date.now() , todoFilePath, TaskBuilder,uniqueId});

inquirer
  .prompt([
    {
      type: "list",
      message: "choose what you want to do:",
      name: "command",
      choices: [
        "help",
        "view todo list",
        "add a new task",
        "mark a task completed",
        "delete a task",
      ],
    },
  ])
  .then(async (answers) => {
    if (answers.command == "help") {
      help();
    } else if (answers.command == "view todo list") {
      inquirer
        .prompt([
          {
            type: "list",
            message: "chose filter you want:",
            name: "filter",
            choices: ["all", "completed", "pending"],
          },
        ])
        .then(async (answers) => {
          if (answers.filter == "all") {
            const tasks = await viewTask({ todoFilePath });
            tasks.forEach((task) => {
              let ist =  new Date(task.dueDate).toLocaleString();
              console.log(task.description, ist);
            });
          } else if (answers.filter == "completed") {
            const tasks = await viewTask({ todoFilePath });
            // console.log("index", tasks);
            tasks.forEach((task) => {
              if (task.completed == true) {
                let ist =  new Date(task.dueDate).toLocaleString();
                console.log(task.description, ist);
              }
            });
          } else if (answers.filter == "pending") {
            const tasks = await viewTask({ todoFilePath });
            // console.log("index",tasks);
            tasks.forEach((task) => {
              if (task.completed == false) {
                let ist =  new Date(task.dueDate).toLocaleString();
                console.log(task.description, ist);
              }
            });
          }
        });
    } else if (answers.command == "add a new task") {
      inquirer
        .prompt([
          { type: "default", message: "Type the task description:", name: "description" },
        ])
        .then((answers) => {
          const description = answers.description;
          inquirer.registerPrompt("datetime", DatePrompt);
          var questions = [
            {
              type: "datetime",
              name: "dt",
              message: "set the due date for the task",
              // initial: Date.parse("01/03/2017"),
              // date: {
              //   min: "1/1/2017",
              //   max: "3/1/2017",
              // },
              // time: {
              //   min: "5:00 PM",
              //   max: "10:00 PM",
              //   minutes: {
              //     interval: 15,
              //   },
              // },
            },
          ];
          inquirer.prompt(questions).then(function (answers) {
            // console.log(JSON.stringify(answers, null, "  "));
            // console.log(answers.dt);
            let utc = answers.dt;
            // console.log(ist);
            addTask({description,utc ,todoFilePath,TaskBuilder,uniqueId});
          });
        });
    } else if (answers.command == "mark a task completed") {
      const tasks = await viewTask({ todoFilePath });
      // console.log(tasks);

      let options = [];
      tasks.forEach((task) => {
        if (task.completed == false) {
          let ist =  new Date(task.dueDate).toLocaleString();
          let option = `${task.id} - ${task.description} - ${ist}`;
          options.push(option);
        }
      });
      inquirer
        .prompt([
          {
            type: "list",
            message: "chose a task to mark completd",
            name: "task",
            choices: options,
          },
        ])
        .then((answers) => {
          console.log(answers);
          let taskId = answers.task.split(" ")[0];
          markCompleted({ taskId, todoFilePath });
        });
    } else if (answers.command == "delete a task") {
      const tasks = await viewTask({ todoFilePath });
      let options = [];
      tasks.forEach((task) => {
        if (task.completed == false) {
          let ist =  new Date(task.dueDate).toLocaleString();
          // console.log(ist);
          let option = `${task.id} - ${task.description} - ${ist}`;
          options.push(option);
        }
      });
      inquirer
        .prompt([
          {
            type: "list",
            message: "select task to delete",
            name: "task",
            choices: options,
          },
        ])
        .then((answers) => {
          let taskId = answers.task.split(" ")[0];
          deleteTask({ taskId, todoFilePath });
        });
    }
  });
