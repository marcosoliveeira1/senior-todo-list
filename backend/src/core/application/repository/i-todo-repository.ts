import { Todo } from "../domain/todo";

export interface ITodoRepository {
    save(todo: Todo): Promise<void>;
    updateDone(todo: Todo): Promise<void>;
    delete(id: string): Promise<void>;
    findAll(): Promise<Todo[]>
    findByDescription(description: string): Promise<Todo | null>;
    findById(id: string): Promise<Todo | null>;
}