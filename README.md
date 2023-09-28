# Todo List Manager

A simple Node.js CLI application to manage your todo list.

## Features

- Add new todos with task descriptions, completion status, and due dates.
- List all todos with checkboxes to indicate completion status.
- Mark todos as completed.
- Remove todos from the list.
- Undo and redo actions using the Memento pattern.

## Installation

1. Clone or download this repository to your local machine.

2. Install the necessary dependencies using npm:

   ```bash
   npm install
   
3. Run the application using Node.js:

   ```bash
   node app.js

## Usage

### Adding a Todo

To add a new todo, use the `add` command with the following options:

- `--task`: Todo task description (required).
- `--completed`: Mark the todo as completed (optional, default is `false`).
- `--due`: Due date for the todo (optional).

Example:

   ```bash
   node app.js add --task "Finish project" --completed true --due "2023-10-10"
```
### Listing Todos

To **list all todos**, use the `list` command:

   ```bash
node app.js list
```
Example output:
   ```bash
   1. ✅ Finish project
   2. [ ] Do homework
   3. [ ] Go to the gym
```
### Completing a Todo

To mark a todo as completed, use the `complete` command followed by the `--index` option and the index of the todo you want to mark as completed:

```bash
node app.js complete --index 1
```
Replace '1' with the index of the todo you want to mark as completed.

Example:
Suppose you have following todos:
```bash
1. [ ] Finish project
2. [ ] Do homework
3. [ ] Go to the gym
```
To mark "Finish project" as completed, run:
```bash
node app.js complete --index 1
```
After running the command, your todos will be updated as follows:
```bash
1. ✅ Finish project
2. [ ] Do homework
3. [ ] Go to the gym
```
The checkbox for "Finish project" will change from [ ] to ✅, indicating that the task is now marked as completed.

### Removing a Todo

To remove a todo from your list, use the `remove` command with the following options:

- `--index`: The index of the todo you want to remove (required).

Example:

```bash
node app.js remove --index 1
```
Replace 1 with the index of the todo you want to delete. This command will permanently remove the selected todo from your list.
Example:
Suppose you have following todos:
```bash
1. ✅ Finish project
2. [ ] Do homework
3. [ ] Go to the gym
```
To remove the "Do homework" task, you would run:
```bash
node app.js remove --index 2
```
After running this command, your updated todo list will look like this:
```bash
1. ✅ Finish project
2. [ ] Go to the gym
```
The "Do homework" task has been removed, and the remaining tasks have been renumbered accordingly.

### Undoing Actions

The `undo` command allows you to revert the most recent action you performed within the Todo List Manager. This command is particularly useful for correcting mistakes or undoing unintended changes.

To undo the last action, follow these steps:

1. Open your terminal.

2. Navigate to the directory where you have the Todo List Manager application.

3. Run the `undo` command:

   ```bash
   node app.js undo
   ```
This command will revert the most recent action, whether it's adding a todo, marking a todo as completed, or removing a todo.

After running the undo command, the application will display a message indicating which action was undone. For example:
```bash
Undo: Last action undone.
```
Your todo list will be restored to its previous state before the last action.
Example
Let's say you accidentally marked a task as completed using the complete command:
```bash
node app.js complete --index 2
```
your todo list will look like:
```bash
1. ✅ Finish project
2. ✅ Do homework
3. [ ] Go to the gym
```
But you realized that it was a mistake, and you want to undo it. You can use the undo command:
```bash
node app.js undo
```
your todo list will look like:
```bash
1. ✅ Finish project
2. [ ] Do homework
3. [ ] Go to the gym
```
