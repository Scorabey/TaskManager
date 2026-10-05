import prompts from "prompts";
import { TaskAPI } from "./TaskAPI.js";
import chalk from "chalk";

const colors = {
  green: "#30be2b",
  gray: "#d3cfdf",
  white: "#fbfaff",
  blue: "#2b70be",
  red: "#be2b2b",
  black: "#030803"
}

const taskApi = new TaskAPI();

const actions = {
  menu: async () => {
    const { action } = await prompts({
      type: "select",
      name: "action",
      message: chalk.hex(colors.white)("Main menu"),
      choices: [
        { title: chalk.hex(colors.green)("Add Task"), value: "add" },
        { title: chalk.hex(colors.gray)("Show Tasks"), value: "show" },
        { title: chalk.hex(colors.gray)("Complete Tasks"), value: "complete" },
        { title: chalk.hex(colors.gray)("Remove Tasks"), value: "remove" },
        { title: chalk.hex(colors.gray)("Search Tasks"), value: "search" },
        { title: chalk.hex(colors.gray)("Count Tasks"), value: "count" },
        { title: chalk.hex(colors.gray)("Export JSON"), value: "export" },
        { title: chalk.hex(colors.red).bold("Exit"), value: "exit" },
      ],
    });

    return action;
  },
  add: async () => {
    const { title } = await prompts({
      type: "text",
      name: "title",
      message: chalk.hex(colors.white)("Enter new task title: "),
    });

    await taskApi.addTask(title);

    return "menu";
  },
  show: async () => {
    console.log(chalk.hex(colors.white)(`\n${JSON.stringify(taskApi.showTasks(), null, 2)}\n`));

    return "menu";
  },
  complete: async () => {
    while(true) {
        const tasks = taskApi.showTasks();

        if(!tasks || tasks.length === 0) {
            console.log(chalk.hex(colors.red)("No tasks yet"))
            return "menu";
        }

        const { id } = await prompts({
        type: "select",
        name: "id",
        message: chalk.hex(colors.white)("Toggle complete task"),
        choices: tasks.map((task) => ({
            title: task.completed ? chalk.bgHex(colors.green).hex(colors.black)(`[X] ${task.title}`) : chalk.hex(colors.gray)(`[ ] ${task.title}`),
            value: task.id,
        })),
        });

        if (id === undefined) return;

        await taskApi.toggleComplete(Number(id));
    }
  },
  remove: async () => {
    const tasks = taskApi.showTasks();

    const { id } = await prompts({
      type: "select",
      name: "id",
      message: chalk.hex(colors.white)("Which task to delete?"),
      choices: tasks.map((task) => ({
        title: chalk.hex(colors.gray)(`${task.title}`),
        value: task.id,
      })),
    });

    if (id === undefined) return;

    return await taskApi.removeTask(Number(id));
  },
  search: async () => {
    const { title } = await prompts({
      type: "text",
      name: "title",
      message: chalk.hex(colors.white)("Enter title: "),
    });

    console.log(taskApi.findTaskByTitle(title));

    return "menu";
  },
  count: async () => {
    console.log(chalk.hex(colors.white)(`Total tasks: ${taskApi.countTasks()}`));

    return "menu";
  },
  export: () => {
    console.log(chalk.hex(colors.white)(taskApi.exportTask()));

    return "menu";
  },
};

export {
  actions
}
