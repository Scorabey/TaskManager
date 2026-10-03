import { beforeEach, describe, expect, it } from 'vitest'
import { TaskAPI, TaskNotFouodError } from './TaskAPI'

describe("TaskAPI", async () => {
    let callTask;
    
    beforeEach(() => {
        callTask = new TaskAPI()
    })

    describe("Testing TaskAPI functional", () => {

        it("Add task and check count", () => {
            const task = callTask.addTask("Buy milk")

            expect(task).toEqual({ id: 1, title: "Buy milk", completed: false })
            expect(callTask.countTasks()).toBe(2)
        })

        it("Add and remove task", () => {
            const task = callTask.addTask("Buy milk")

            expect(task).toEqual({ id: 1, title: "Buy milk", completed: false })
            expect(callTask.countTasks()).toBe(2)
            const removed = callTask.removeTask(1)
            expect(removed).toEqual({ id: 1, title: "Buy milk", completed: false })
            expect(callTask.countTasks()).toBe(1)
        })

        it("Toggle completed task", () => {
            const task = callTask.addTask("Buy milk")

            expect(task).toEqual({ id: 1, title: "Buy milk", completed: false })
            const completedTask = callTask.toggleComplete(1)
            expect(completedTask).toEqual({ id: 1, title: "Buy milk", completed: true })
        })

        it("Find task by id", () => {
            const task = callTask.findTaskById(0)

            expect(task).toEqual({ id: 0, title: "This is example task", completed: false })
        })

        it("Find task by title", () => {
            const task = callTask.findTaskByTitle("This is example task")

            expect(task).toEqual([{ id: 0, title: "This is example task", completed: false }])
        })

        it("Add and show tasks", () => {
            const task = callTask.addTask("Buy milk")

            expect(task).toEqual({ id: 1, title: "Buy milk", completed: false })
            const tasks = callTask.showTasks()
            expect(tasks).toEqual([
                { id: 0, title: "This is example task", completed: false },
                { id: 1, title: "Buy milk", completed: false }
            ])
        })

        it("Count tasks", () => {
            callTask.addTask("Buy milk")

            expect(callTask.countTasks()).toBe(2)
        })

        it("Count completed tasks", () => {
            callTask.addTask("Buy milk")

            expect(callTask.countTasks()).toBe(2)
            callTask.toggleComplete(1)
            expect(callTask.countCompletedTasks()).toBe(1)
        })

        it("Export tasks", () => {
            callTask.addTask("Buy milk")

            expect(callTask.exportTask(0)).toEqual(`[{"id":0,"title":"This is example task","completed":false},{"id":1,"title":"Buy milk","completed":false}]`)
        })

        it("Import task", () => {
            callTask.importTasks(`{"id":1,"title":"Buy milk","completed":false}`)

            expect(callTask.showTasks()).toEqual([
                { id: 0, title: "This is example task", completed: false },
                { id: 1, title: "Buy milk", completed: false }
            ])
        })

    })
})

describe("TaskNotFoundError", () => {

    it("Not found id", () => {
        const error = new TaskNotFouodError(5)

        expect(error.message).toBe("Oops... Tasks with id: 5 not found")
    })

    it("Checking name and code", () => {
        const error = new TaskNotFouodError(5)

        expect(error.code).toBe(404)
        expect(error.name).toBe("TaskNotFoundError")
    })

    it("Checking instance by class Error", () => {
        const error = new TaskNotFouodError(5)

        expect(error).toBeInstanceOf(Error)
        expect(error).toBeInstanceOf(TaskNotFouodError)
    })

})

describe("TaskNotFound on TaskAPI", () => {
    let callTask;

    beforeEach(() => {
        callTask = new TaskAPI()
    })

    describe("TaskAPI throwing TaskNotFoundError", () => {

        it("TaskAPI get by id throwing TaskNotFouodError", () => {
            expect(() => callTask.findTaskById(999)).toThrow(TaskNotFouodError)
        })

        it("TaskAPI toggle complete and remove task throwing TaskNotFoundError", () => {
            expect(() => callTask.toggleComplete(999)).toThrow(TaskNotFouodError)
            expect(() => callTask.removeTask(999)).toThrow(TaskNotFouodError)
        })

        it("TaskAPI throwing TypeError on add task", () => {
            expect(() => callTask.addTask("")).toThrow(TypeError)
        })

        it("TaskAPI throwing TypeError on find task by id", () => {
            expect(() => callTask.findTaskById(-1)).toThrow(TypeError)
        })

    })

})