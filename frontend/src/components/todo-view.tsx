import { TodoType } from "../types"
import { Todo } from "./todo"

export const TodoView = ({ todos, removeTodo, toggleTodo }: { todos: TodoType[], removeTodo: (id: string) => void, toggleTodo: (id: string) => void }) => {
    return (
        <div className="my-5">
            {todos.map((todo: TodoType) => (
                <Todo key={todo.id} todo={todo} removeTodo={removeTodo} toggleTodo={toggleTodo} />
            ))}
        </div>
    );
}
