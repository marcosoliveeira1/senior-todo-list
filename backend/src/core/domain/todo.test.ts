import { describe, expect, it } from "bun:test";
import { DomainException } from "../application/exception/domain-exception";
import { Todo } from "./todo";

describe("Testing Todo", () => {
	it("should create a todo", () => {
		const todo = Todo.create({ id: "1", description: "test" }) as Todo;
		expect(todo.id).toBe("1");
		expect(todo.description.value).toBe("test");
		expect(todo.done).toBe(false);
	});

	it("should restore a todo", () => {
		const todo = Todo.restore({
			id: "1",
			description: "test",
			done: true,
		}) as Todo;
		expect(todo.id).toBe("1");
		expect(todo.description.value).toBe("test");
		expect(todo.done).toBe(true);
	});

	it("should mark a todo as done", () => {
		const todo = Todo.create({ id: "1", description: "test" }) as Todo;
		todo.done = true;
		expect(todo.done).toBe(true);
	});

	it("should not create a todo with empty description", () => {
		const todo = Todo.create({ id: "1", description: "" });
		expect(todo).toBeInstanceOf(DomainException);
	});

	it("should not restore a todo with short description", () => {
		const todo = Todo.restore({ id: "1", description: "t", done: true });
		expect(todo).toBeInstanceOf(DomainException);
	});
});
