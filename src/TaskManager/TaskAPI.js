class TaskNotFouodError extends Error {
  constructor(id) {
    super(`Oops... Tasks with id: ${id} not found`);
    this.name = "TaskNotFoundError";
    this.code = 404;
  }
}

class TaskAPI {
  #tasks = [{ id: 0, title: "This is example task", completed: false }];
  #nextId = 0;

  /*
    Basic method which return all 
    tasks filtered by id, uses on other methods
    */
  #getTask(id) {
    if (typeof id !== "number" || id < 0)
      throw new TypeError("Id must be a number");
    const task = this.#tasks.find((task) => task.id === id);
    if (!task)
      throw new TaskNotFouodError(id);
    return task;
  }

  /*
  Private method for return copies
  required for class security
  */
  #snapshot(task) {
    return { ...task };
  }

  /*
    First, we update the nextId variable to 1, 
    then assign it to our newTask object, and update 
    the private tasks object.
    */
  addTask(title) {
    if (typeof title !== "string" || title.trim() === "")
      throw new TypeError("Title must be a non-empty string");

    const newTask = {
      id: ++this.#nextId,
      title: title,
      completed: false,
    };

    this.#tasks.push(newTask);
    return this.#snapshot(newTask);
  }

  // Simple method for show all tasks
  showTasks() {
    return this.#tasks.map((task) => this.#snapshot(task));
  }

  /*
    Basic method which return all 
    tasks filtered by id
    */
  findTaskById(id) {
    return this.#snapshot(this.#getTask(id));
  }

  /*
    Basic method which return all 
    tasks filtered by title
    */
  findTaskByTitle(title) {
    return this.#tasks
      .filter((task) => task.title === title.trim())
      .map((task) => this.#snapshot(task));
  }

  /*
    First find link on the task as needed id,
    next toggle completed, and return all array
    */
  toggleComplete(id) {
    const task = this.#getTask(id);
    task.completed = !task.completed;
    return this.#snapshot(task);
  }

  /*
    First find index task by id,
    next splice tasks array by index,
    and finally return removed task
    */
  removeTask(id) {
    const task = this.#getTask(id);
    this.#tasks = this.#tasks.filter((task) => task.id !== id);
    return this.#snapshot(task);
  }

  /*
  Very simple to explain
  */
  countTasks() {
    return this.#tasks.length;
  }

  /*
  The same, only here we filter the task execution
  */
  countCompletedTasks() {
    return this.#tasks.filter((task) => task.completed === true).length;
  }

  /*
  simple method for export all tasks
  */
  exportTask(spaces = 2) {
    return JSON.stringify(this.#tasks, null, spaces);
  }

  /*
  Import new task, uses json string object
  update tasks and return copies of tasks
  */
  importTasks(jsonString) {
    this.#tasks = [...this.#tasks, JSON.parse(jsonString)];
    return this.#tasks.map((task) => this.#snapshot(task));
  }
}

module.exports = { TaskAPI, TaskNotFouodError }