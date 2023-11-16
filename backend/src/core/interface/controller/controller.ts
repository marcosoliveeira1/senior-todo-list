import { ApplicationException } from "../../application/exception/application-exception";
import { DomainException } from "../../application/exception/domain-exception";
import { IUseCase } from "../../application/use-case/i-use-case";
import { IController } from "./i-controller";

export class Controller<Input, Output> implements IController {
    constructor(
        private useCase: IUseCase<Input, Output>
    ) { }

    public async execute(input: Input): Promise<ControllerOutput> {

        const output = await this.useCase.execute(input);

        
        
        if (output instanceof ApplicationException || output instanceof DomainException) {
            return {
                body: JSON.stringify({
                    errors: [output.message]
                }),
                statusCode: 400
            }
        }

        return {
            body: JSON.stringify(output),
            statusCode: 200
        }
    }
}

export type ControllerOutput = {
    body?: string
    statusCode: 200 | 400
}