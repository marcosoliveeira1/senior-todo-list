export class CreateTodoOutput {
	constructor(
		public readonly id: string,
		public readonly description: string,
		public readonly done: boolean,
	) {}
}
