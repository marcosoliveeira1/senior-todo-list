import { TodoType } from "../types"
import { Todo } from "./todo"

export const TodoView = ({ todos }: { todos: TodoType[] }) => (
    <div className="my-5">
        {
            todos.map(({ description, done }) => (
                <Todo key={description} description={description} done={done} />

            ))
        }
    </div>
)
