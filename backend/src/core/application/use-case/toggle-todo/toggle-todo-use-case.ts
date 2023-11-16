import { ApplicationException } from "../../exception/application-exception";
import { ITodoRepository } from "../../repository/i-todo-repository";
import { IUseCase } from "../i-use-case";
import { ToggleTodoInput } from "./toggle-todo-input";
import { ToggleTodoOutput } from "./toggle-todo-output";

export class ToggleTodoUseCase
	implements IUseCase<ToggleTodoInput, ToggleTodoOutput>
{
	public constructor(private readonly repository: ITodoRepository) {}

	async execute({
		id,
		done,
	}: ToggleTodoInput): Promise<ApplicationException | ToggleTodoOutput> {
		const todo = await this.repository.findById(id);

		if (!todo) {
			return new ApplicationException("Todo not found");
		}

		todo.done = done;

		await this.repository.updateDone(todo);

		return new ToggleTodoOutput(todo.id, todo.description.value, todo.done);
	}
}
