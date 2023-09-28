const yargs = require("yargs");
const fs = require("fs");

const todosFile = "todos.json";
const mementosFile = "mementos.json";

// Check if the todos.json file exists, and if not, create an empty array.
if (!fs.existsSync(todosFile)) {
  fs.writeFileSync(todosFile, "[]");
}

// Check if the mementos.json file exists, and if not, create an empty array.
if (!fs.existsSync(mementosFile)) {
  fs.writeFileSync(mementosFile, "[]");
}

// Load existing todos from the JSON file.
function loadTodos() {
  const todosJson = fs.readFileSync(todosFile, "utf8");
  return JSON.parse(todosJson);
}

// Save todos to the JSON file.
function saveTodos(todos) {
  const todosJson = JSON.stringify(todos, null, 2);
  fs.writeFileSync(todosFile, todosJson);
}

// Load existing mementos from the JSON file.
function loadMementos() {
  const mementosJson = fs.readFileSync(mementosFile, "utf8");
  return JSON.parse(mementosJson);
}

// Save mementos to the JSON file.
function saveMementos(mementos) {
  const mementosJson = JSON.stringify(mementos, null, 2);
  fs.writeFileSync(mementosFile, mementosJson);
}

// TodoBuilder for creating todos with various attributes.
class TodoBuilder {
  constructor(task) {
    this.task = task;
    this.completed = false;
    this.due = null;
  }

  setCompleted(completed) {
    this.completed = completed;
    return this;
  }

  setDueDate(due) {
    this.due = due;
    return this;
  }

  build() {
    return {
      task: this.task,
      completed: this.completed,
      due: this.due,
    };
  }
}

// Command to add a new todo using the builder pattern.
yargs.command({
  command: "add",
  describe: "Add a new todo",
  builder: {
    task: {
      describe: "Todo task description",
      demandOption: true,
      type: "string",
    },
    completed: {
      describe: "Mark the todo as completed (true or false)",
      type: "boolean",
    },
    due: {
      describe: "Due date for the todo (YYYY-MM-DD)",
      type: "string",
    },
  },
  handler(argv) {
    const todos = loadTodos();
    const mementos = loadMementos();

    const todo = new TodoBuilder(argv.task)
      .setCompleted(argv.completed || false)
      .setDueDate(argv.due || null)
      .build();

    const newState = [...todos];
    newState.push(todo);

    // Create a memento (snapshot) of the current state.
    const memento = {
      todos: newState,
      command: "add",
    };

    mementos.push(memento);

    // Save the new state and mementos.
    saveTodos(newState);
    saveMementos(mementos);

    console.log("Todo added:", argv.task);
  },
});

// Command to list all todos.
yargs.command({
  command: "list",
  describe: "List all todos",
  handler() {
    const todos = loadTodos();
    //   console.log(todos);
    if (todos.length === 0) {
      console.log("No todos found.");
    } else {
      console.log("Todos:");
      todos.forEach((todo, index) => {
        console.log(
          `${index + 1}. ${todo.completed ? "✅" : "[ ]"} ${todo.task}`
        );
      });
    }
  },
});

// Command to mark a todo as completed.
yargs.command({
  command: "complete",
  describe: "Mark a todo as completed",
  builder: {
    index: {
      describe: "Index of the todo to mark as completed",
      demandOption: true,
      type: "number",
    },
  },
  handler(argv) {
    const todos = loadTodos();
    const mementos = loadMementos();
    if (argv.index >= 1 && argv.index <= todos.length) {
      todos[argv.index - 1].completed = true;
        
      const newState = [...todos];

      // Create a memento (snapshot) of the current state.
      const memento = {
        todos: newState,
        command: "complete",
      };

      mementos.push(memento);

      // Save the new state and mementos.
      saveTodos(newState);
      saveMementos(mementos);

      console.log("Todo marked as completed:", todos[argv.index - 1].task);
    } else {
      console.log("Invalid todo index.");
    }
  },
});

// Command to remove a todo.
yargs.command({
  command: "remove",
  describe: "Remove a todo",
  builder: {
    index: {
      describe: "Index of the todo to remove",
      demandOption: true,
      type: "number",
    },
  },
  handler(argv) {
    const todos = loadTodos();
    const mementos = loadMementos();
    if (argv.index >= 1 && argv.index <= todos.length) {
      const removedTodo = todos.splice(argv.index - 1, 1);

      const newState = [...todos];

      // Create a memento (snapshot) of the current state.
      const memento = {
        todos: newState,
        command: "remove",
      };

      mementos.push(memento);

      // Save the new state and mementos.
      saveTodos(newState);
      saveMementos(mementos);

      console.log("Todo removed:", removedTodo[0].task);
    } else {
      console.log("Invalid todo index.");
    }
  },
});

// Command to undo the last action.
yargs.command({
  command: "undo",
  describe: "Undo the last action",
  handler() {
    const todos = loadTodos();
    const mementos = loadMementos();

    if (mementos.length === 0) {
      console.log("Nothing to undo.");
      return;
    }

    // Pop the last memento from the list.
    const lastMemento = mementos.pop();
    
    // Push the undone action into redo list.
    /**
     * 
     */
    // Restore the previous state.
    saveTodos(lastMemento.todos);
    saveMementos(mementos);

    console.log("Undo: Last action undone.");
  },
});

// Command to redo the last undone action.
yargs.command({
  command: "redo",
  describe: "Redo the last undone action",
  handler() {
    const todos = loadTodos();
    const mementos = loadMementos();

    // Check if there are undone actions in the mementos.
    const lastMemento = mementos[mementos.length - 1];
    if (!lastMemento) {
      console.log("Nothing to redo.");
      return;
    }

    // Apply the undone action.
    saveTodos(lastMemento.todos);
    saveMementos(mementos);

    console.log("Redo: Last undone action redone.");
  },
});

yargs.parse();
