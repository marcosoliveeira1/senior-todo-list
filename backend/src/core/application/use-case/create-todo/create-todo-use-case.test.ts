import { beforeEach, describe, expect, it, mock } from "bun:test";
import { InMemoryTodoRepository } from "../../../../database/in-memory-repository";
import { Todo } from "../../../domain/todo";
import { ApplicationException } from "../../exception/application-exception";
import { DomainException } from "../../exception/domain-exception";
import { ITodoRepository } from "../../repository/i-todo-repository";
import { CreateTodoOutput } from "./create-todo-output";
import { CreateTodoUseCase } from "./create-todo-use-case";

describe("Testing CreateTodoUseCase", () => {
	const makeSut = () => {
		const todoRepository = new InMemoryTodoRepository();

		return {
			sut: new CreateTodoUseCase(todoRepository),
			todoRepository,
		};
	};
	it("should create a todo", async () => {
		const sut = makeSut().sut;
		const output = (await sut.execute({
			id: "1",
			description: "test",
		})) as CreateTodoOutput;
		expect(output.id).toBe("1");
		expect(output.description).toBe("test");
	});

	it("should not create a todo with empty description", async () => {
		const sut = makeSut().sut;
		const output = await sut.execute({ id: "1", description: "" });
		expect(output).toBeInstanceOf(DomainException);
		expect((output as DomainException).message).toBe("Description is required");
	});

	it("should not create a todo with less than 3 characters", async () => {
		const sut = makeSut().sut;
		const output = await sut.execute({ id: "1", description: "te" });
		expect(output).toBeInstanceOf(DomainException);
		expect((output as DomainException).message).toBe(
			"Description must be at least 3 characters long",
		);
	});

	it("should not create a todo that already exists", async () => {
		const { todoRepository, sut } = makeSut();
		todoRepository.save(Todo.create({ id: "1", description: "test" }) as Todo);
		const output = await sut.execute({ id: "1", description: "test" });
		expect(output).toBeInstanceOf(ApplicationException);
		expect((output as ApplicationException).message).toBe(
			"Todo already exists",
		);
	});
});
