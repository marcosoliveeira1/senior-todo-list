import { ApplicationException } from "../../exception/application-exception";
import { ITodoRepository } from "../../repository/i-todo-repository";
import { IUseCase } from "../i-use-case";
import { DeleteTodoInput } from "./delete-todo-input";

export class DeleteTodoUseCase implements IUseCase<DeleteTodoInput, unknown> {
	public constructor(private readonly repository: ITodoRepository) {}

	async execute({
		id,
	}: DeleteTodoInput): Promise<ApplicationException | unknown> {
		const todo = await this.repository.findById(id);

		if (!todo) {
			return new ApplicationException("Todo not found");
		}

		await this.repository.delete(todo.id);
	}
}
