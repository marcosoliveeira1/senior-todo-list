export interface IController {
    execute(input: any): Promise<any>;
}