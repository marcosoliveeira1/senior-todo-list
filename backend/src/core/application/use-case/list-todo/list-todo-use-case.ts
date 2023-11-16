import { ApplicationException } from "../../exception/application-exception";
import { ITodoRepository } from "../../repository/i-todo-repository";
import { IUseCase } from "../i-use-case";
import { ListTodoOutput } from "./list-todo-output";

export class ListTodoUseCase implements IUseCase<undefined, ListTodoOutput> {
	public constructor(private readonly repository: ITodoRepository) {}

	async execute(): Promise<ListTodoOutput> {
		const todo = await this.repository.findAll();
		return new ListTodoOutput(
			todo.map((t) => {
				return {
					id: t.id,
					description: t.description.value,
					done: t.done,
				};
			}),
		);
	}
}
