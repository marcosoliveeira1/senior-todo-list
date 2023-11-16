import { DomainException } from "../../exception/domain-exception";
import { Todo } from "../../../domain/todo";
import { ITodoRepository } from "../../repository/i-todo-repository";
import { CreateTodoInput } from "./create-todo-input";
import { CreateTodoOutput } from "./create-todo-output";
import { ApplicationException } from "../../exception/application-exception";
import { IUseCase } from "../i-use-case";

export class CreateTodoUseCase implements IUseCase<CreateTodoInput, CreateTodoOutput> {
    public constructor(private readonly repository: ITodoRepository) { }

    async execute({ id, description }: CreateTodoInput): Promise<DomainException | CreateTodoOutput> {
        const todoOrError = Todo.create({ id, description });
        if (todoOrError instanceof DomainException) {
            return todoOrError;
        }

        const todo = todoOrError as Todo;

        const existDuplicated = await this.repository.findByDescription(todo.description.value);

        if (existDuplicated) {
            return new ApplicationException("Todo already exists");
        }

        const todoExists = await this.repository.findById(todo.id);
        if(todoExists) {
            return new ApplicationException("Todo with this id already exists");
        }

        await this.repository.save(todo);

        return new CreateTodoOutput(todo.id, todo.description.value, todo.done);
    }
}