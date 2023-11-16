export class ToggleTodoOutput {
    constructor(
        public readonly id: string,
        public readonly description: string,
        public readonly done: boolean
    ) { }
}