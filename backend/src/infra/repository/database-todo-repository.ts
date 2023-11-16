import { ITodoRepository } from "../../core/application/repository/i-todo-repository";
import { Todo } from "../../core/domain/todo";
import { IDatabaseConnection } from "../../database/i-database-connection";

export class DatabaseTodoRepository implements ITodoRepository {
	constructor(private readonly db: IDatabaseConnection) {}

	async save(todo: Todo): Promise<void> {

		this.db.query<TodoModel, [string, string, boolean]>(
			"INSERT INTO TODOS (id, description, done) VALUES ($1, $2, $3)",
			[todo.id, todo.description.value, todo.done], // create a type for this
		);
	}
	async updateDone(todo: Todo): Promise<void> {
		await this.db.query<TodoModel, [boolean, string]>("UPDATE TODOS SET done = $1 WHERE id = $2", [
			todo.done,
			todo.id,
		]);
	}
	async delete(id: string): Promise<void> {
		await this.db.query<TodoModel, [string]>("DELETE FROM TODOS WHERE id = $1", [id]);
	}
	async findAll(): Promise<Todo[]> {
		const todos = await this.db.query<TodoModel, []>("SELECT * FROM TODOS");

		return todos.map((todo: TodoModel) => {
			return Todo.restore({
				id: todo.id,
				description: todo.description,
				done: todo.done === 1 ? true : false,
			}) as Todo;
		});
	}
	async findByDescription(description: string): Promise<Todo | null> {
		const todo = await this.db.queryFirst<TodoModel, [string]>(
			"SELECT * FROM TODOS WHERE description = $1",
			[description],
		);

		return todo
			? (Todo.restore({
					id: todo.id,
					description: todo.description,
					done: todo.done === 1 ? true : false,
			  }) as Todo)
			: null;
	}
	async findById(id: string): Promise<Todo | null> {
		const todo = await this.db.queryFirst<TodoModel, [string]>(
			"SELECT * FROM TODOS WHERE id = $1",
			[id],
		);
		return todo
			? (Todo.restore({
					id: todo.id,
					description: todo.description,
					done: todo.done === 1 ? true : false,
			  }) as Todo)
			: null;
	}
}

type TodoModel = {
	id: string;
	description: string;
	done: number;
};
