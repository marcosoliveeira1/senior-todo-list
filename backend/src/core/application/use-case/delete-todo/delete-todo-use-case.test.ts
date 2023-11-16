import { describe, expect, it } from "bun:test";
import { Todo } from "../../../domain/todo";
import { DeleteTodoUseCase } from "./delete-todo-use-case";
import { ApplicationException } from "../../exception/application-exception";
import { InMemoryTodoRepository } from "../../../../database/in-memory-repository";

describe("Testing DeleteTodoUseCase", () => {
    const makeSut = () => {
        const todoRepository = new InMemoryTodoRepository();
        
        return {
            sut: new DeleteTodoUseCase(todoRepository),
            todoRepository
        }
    }

    it("should delete a todo", async () => {
        const { sut, todoRepository } = makeSut();
        await todoRepository.save(Todo.create({ id: "1", description: "test" }) as Todo);

        const output = await sut.execute({ id: "1" });

        expect(output).toBeUndefined();
    });

    it("should not delete a todo that does not exist", async () => {
        const { sut } = makeSut();
        const output = await sut.execute({ id: "1" });

        expect(output).toBeInstanceOf(ApplicationException);
        expect((output as ApplicationException).message).toBe("Todo not found");
    })

})