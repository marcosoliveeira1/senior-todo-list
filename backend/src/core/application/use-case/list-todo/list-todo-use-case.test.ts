import { describe, expect, it } from "bun:test";
import { ITodoRepository } from "../../repository/i-todo-repository";
import { Todo } from "../../../domain/todo";
import { ListTodoUseCase } from "./list-todo-use-case";
import { ApplicationException } from "../../exception/application-exception";
import { InMemoryTodoRepository } from "../../../../database/in-memory-repository";

describe("Testing ListTodoUseCase", () => {
    const makeSut = () => {
        const todoRepository = new InMemoryTodoRepository();

        return {
            sut: new ListTodoUseCase(todoRepository),
            todoRepository
        }
    }

    it("should list todos", async () => {
        const { sut, todoRepository } = makeSut();
        await todoRepository.save(Todo.create({ id: "1", description: "test" }) as Todo);
        await todoRepository.save(Todo.create({ id: "2", description: "test2" }) as Todo);

        const output = await sut.execute();

        expect(output.todos.length).toBe(2);
        expect(output.todos[0].id).toBe("1");
        expect(output.todos[1].id).toBe("2");
    });

    it("should return a empty list", async () => {
        const { sut } = makeSut();

        const output = await sut.execute();

        expect(output.todos.length).toBe(0);
    })



})