import { describe, expect, it } from "bun:test";
import { ITodoRepository } from "../../repository/i-todo-repository";
import { ToggleTodoUseCase } from "./toggle-todo-use-case";
import { ToggleTodoOutput } from "./toggle-todo-output";
import { DomainException } from "../../exception/domain-exception";
import { ApplicationException } from "../../exception/application-exception";
import { InMemoryTodoRepository } from "../../../../database/in-memory-repository";
import { Todo } from "../../../domain/todo";

describe("Testing ToggleTodoUseCase", () => {
    const makeSut = () => {
        const todoRepository = new InMemoryTodoRepository();

        return {
            sut: new ToggleTodoUseCase(todoRepository),
            todoRepository
        }
    }

    it("should toggle a todo", async () => {
        const { sut, todoRepository } = makeSut();
        await todoRepository.save(Todo.create({ id: "1", description: "test" }) as Todo);

        const output = await sut.execute({ id: "1", done: true }) as ToggleTodoOutput;
        expect(output.id).toBe("1");
        expect(output.done).toBeTrue();
    });

    it("should not toggle a todo that does not exist", async () => {
        const { sut } = makeSut();
        const output = await sut.execute({ id: "1", done: true });

        expect(output).toBeInstanceOf(ApplicationException);
        expect((output as ApplicationException).message).toBe("Todo not found");
    })

})