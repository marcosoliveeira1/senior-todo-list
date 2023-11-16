export interface IController<Input, Output> {
	execute(input: Input): Promise<Output>;
}
