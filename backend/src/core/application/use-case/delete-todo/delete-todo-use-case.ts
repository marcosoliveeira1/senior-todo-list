import { ITodoRepository } from "../../repository/i-todo-repository";
import { DeleteTodoInput } from "./delete-todo-input";
import { ApplicationException } from "../../exception/application-exception";
import { IUseCase } from "../i-use-case";

export class DeleteTodoUseCase implements IUseCase<DeleteTodoInput, void> {
    public constructor(private readonly repository: ITodoRepository) { }

    async execute({ id }: DeleteTodoInput): Promise<ApplicationException | void> {
        const todo = await this.repository.findById(id);

        if (!todo) {
            return new ApplicationException("Todo not found");
        }

        await this.repository.delete(todo.id);
    }
}