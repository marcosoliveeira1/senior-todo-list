import { ITodoRepository } from "../core/application/repository/i-todo-repository";
import { Todo } from "../core/domain/todo";

export class InMemoryTodoRepository implements ITodoRepository {
	async delete(id: string): Promise<void> {
		this.todos.delete(id);
	}
	async findAll(): Promise<Todo[]> {
		return Array.from(this.todos.values());
	}

	private todos = new Map<string, Todo>();
	async save(todo: Todo): Promise<void> {
		this.todos.set(todo.id, todo);
	}

	async updateDone(todo: Todo): Promise<void> {
		this.todos.set(todo.id, todo);
	}

	async findById(id: string): Promise<Todo | null> {
		return this.todos.get(id) ?? null;
	}

	async findByDescription(description: string): Promise<Todo | null> {
		for (const todo of this.todos.values()) {
			if (todo.description.value === description) {
				return todo;
			}
		}
		return null;
	}
}
