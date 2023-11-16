export class CreateTodoInput {
	constructor(
		public readonly description: string,
		public readonly id?: string,
	) {}
}
