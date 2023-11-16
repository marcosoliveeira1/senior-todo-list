export class ListTodoOutput {
    constructor(
        public readonly todos: Todo[]
    ) { }
}

type Todo = {
    id: string
    description: string
    done: boolean
}