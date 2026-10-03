# TaskManager

A simple terminal-based task manager built with **Node.js**. It is a learning project focused on practicing modern JavaScript (classes, private fields, error handling, async/await) and building an interactive command-line interface.

## Demo

|            Add a task             |            Remove a task            |               Export tasks               |
| :-------------------------------: | :---------------------------------: | :--------------------------------------: |
| ![Add task](./public/addTask.gif) | ![Remove task](./public/remove.gif) | ![Export tasks](./public/exportTask.gif) |

## Purpose

The goal of this project is to learn and practice:

- Writing clean, encapsulated code with JavaScript classes and **private fields** (`#`)
- Separating business logic (`TaskAPI`) from the user interface (`TaskManager`)
- Validating input and handling errors
- Building an interactive CLI with third-party libraries

## Features

- **Add Task** – create a new task with a title
- **Show Tasks** – print all tasks as formatted JSON
- **Complete Tasks** – toggle the completed state of tasks in an interactive list
- **Remove Tasks** – pick a task from a list and delete it
- **Search Tasks** – find tasks by title
- **Count Tasks** – show the total number of tasks
- **Export JSON** – print all tasks as a JSON string
- Input validation with clear error messages
- Colored terminal output

The `TaskAPI` class also provides `findTaskById`, `countCompletedTasks` and `importTasks` methods for use in code.

## Tech Stack

- [Node.js](https://nodejs.org/)
- [chalk](https://www.npmjs.com/package/chalk) – terminal colors
- [prompts](https://www.npmjs.com/package/prompts) – interactive menus and input

## Project Structure

```
TaskManager/
├── public/               # GIF demos used in this README
│   ├── addTask.gif
│   ├── exportTask.gif
│   └── remove.gif
├── src/
│   ├── TaskManager/
│   │   ├── TaskAPI.js        # Task logic (data + methods)
│   │   └── TaskManager.js    # CLI menu and actions
│   └── index.js              # Entry point
├── package.json
└── README.md
```

## Getting Started

### Requirements

- Node.js 18 or newer
- npm

### Installation

```bash
git clone https://github.com/Scorabey/TaskManager.git
cd TaskManager
npm install
```

### Run

```bash
node run dev
```

Use the arrow keys to navigate the menu and `Enter` to select an option.

## Task Format

Each task is a simple object:

```json
{
  "id": 1,
  "title": "Buy milk",
  "completed": false
}
```

## Challenges

- **Encapsulation.** Keeping the task list private meant returning copies (snapshots) of tasks instead of the original objects, so outside code cannot change them by accident.
- **Validation and errors.** Deciding what counts as valid input (ids, empty titles) and throwing meaningful errors for it.
- **Async CLI flow.** Chaining interactive prompts with `async/await`, and returning to the main menu after each action.
- **Interactive lists.** Rendering and updating a selectable list of tasks, for example for toggling completion.

## What I Learned

- How to use private class fields and methods to protect internal state
- How to build an interactive terminal app with `prompts` and style it with `chalk`
- Why defensive copies matter when exposing internal data

## Future Improvements

- Add an Import option to the CLI menu
- Save tasks to a file so they persist between runs
- Rewrite the project in TypeScript

## Author

**Shatilov D. M.** – [@Scorabey](https://github.com/Scorabey)
