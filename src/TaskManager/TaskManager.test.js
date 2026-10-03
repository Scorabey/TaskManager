import { describe, it, vi, beforeEach, expect } from "vitest";
import prompts from "prompts";

const mockApi = vi.hoisted(() => ({
    addTask: vi.fn(),
    showTasks: vi.fn(),
    toggleComplete: vi.fn(),
    removeTask: vi.fn(),
    findTaskByTitle: vi.fn(),
    countTasks: vi.fn(),
    exportTask: vi.fn(),
}))

vi.mock("./TaskAPI", () => ({
    TaskAPI: class {
        constructor() {
            return mockApi
        }
    }
}))

import actions from "./TaskManager";

beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(console, "log").mockImplementation(() => {})
})

describe("TaskManager", () => {

    it("actions.menu", async () => {
        prompts.inject(["add"]);
        
        expect(await actions.menu()).toBe("add");
    });

    it("actions.add", async () => {
        prompts.inject(["Buy milk"])

        const next = await actions.add()

        expect(mockApi.addTask).toHaveBeenCalledWith("Buy milk")
        expect(next).toBe("menu")
    })

    it("actions.show", async () => {
        mockApi.showTasks.mockReturnValue([{ id: 1, title: "A", completed: false }])

        const next = await actions.show()

        expect(mockApi.showTasks).toHaveBeenCalled()
        expect(next).toBe("menu")
    })

    it("actions.complete", async () => {
        mockApi.showTasks.mockReturnValue([
            { id: 1, title: "A", completed: false },
            { id: 2, title: "B", completed: false },
        ]);
        prompts.inject([1, 2, new Error("cancelled")]);

        await actions.complete();

        expect(mockApi.toggleComplete).toHaveBeenCalledTimes(2);
        expect(mockApi.toggleComplete).toHaveBeenNthCalledWith(1, 1);
        expect(mockApi.toggleComplete).toHaveBeenNthCalledWith(2, 2);
    })

    it("actions.remove", async () => {
        mockApi.showTasks.mockReturnValue([{ id: 1, title: "A", completed: false }]);
        prompts.inject([1]);

        await actions.remove();

        expect(mockApi.removeTask).toHaveBeenCalledWith(1);
    });

    it("actions.remove handle undefined id", async () => {
        mockApi.showTasks.mockReturnValue([{ id: 1, title: "A", completed: false }]);
        prompts.inject([new Error("cancelled")]);

        const result = await actions.remove();

        expect(result).toBeUndefined();
        expect(mockApi.removeTask).not.toHaveBeenCalled();
    });

    it("actions.search", async () => {
        mockApi.findTaskByTitle.mockReturnValue([]);
        prompts.inject(["milk"]);

        await actions.search();

        expect(mockApi.findTaskByTitle).toHaveBeenCalledWith("milk");
    });

    it("actions.count", async () => {
        mockApi.countTasks.mockReturnValue(3);

        await actions.count();

        expect(console.log).toHaveBeenCalledWith(expect.stringContaining("Total tasks: 3"));
    });

    it("actions.complete if empty array", async () => {
        mockApi.showTasks.mockReturnValue([]);

        expect(await actions.complete()).toBe("menu");
    });

    it("actions.export", () => {
        mockApi.exportTask.mockReturnValue('[{"id":1,"title":"A"}]');

        const next = actions.export();

        expect(mockApi.exportTask).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledWith(
            expect.stringContaining('[{"id":1,"title":"A"}]')
        );
        expect(next).toBe("menu");
    });

});