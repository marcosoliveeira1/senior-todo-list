import { randomUUID } from "node:crypto";
import { Description } from "./value-objects/description";
import { DomainException } from "../application/exception/domain-exception";

export class Todo {
    private constructor(public readonly id: string, public readonly description: Description, private _done: boolean) { }

    get done() {
        return this._done
    }

    set done(done: boolean) {
        this._done = done;
    }

    static create(input: { id?: string, description: string }) {
        if (!input.id) {
            input.id = randomUUID();
        }
        const descriptionOrError = Description.create(input.description);
        if (descriptionOrError instanceof DomainException) {
            return descriptionOrError;
        }
        return new Todo(input.id, descriptionOrError, false);
    }

    static restore(input: { id: string, description: string, done: boolean }) {
        const descriptionOrError = Description.create(input.description);
        if (descriptionOrError instanceof DomainException) {
            return descriptionOrError;
        }
        return new Todo(input.id, descriptionOrError, input.done);
    }
}