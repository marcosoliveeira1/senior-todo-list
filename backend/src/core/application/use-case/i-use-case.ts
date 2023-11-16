import { ApplicationException } from "../exception/application-exception";
import { DomainException } from "../exception/domain-exception";

export interface IUseCase<T, U> {
    execute(input: T): Promise<ApplicationException | DomainException | U>;
}