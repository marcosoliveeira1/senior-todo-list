import { DomainException } from "../../application/exception/domain-exception";

export class Description {
    private constructor(public readonly value: string) {
        this.value = value;
    }

    static create(value: string) {
        let trimmedValue = value.trim() ?? null;
        if (!trimmedValue || trimmedValue === '') {
            return new DomainException("Description is required");
        }
        if(trimmedValue.length < 3){
            return new DomainException("Description must be at least 3 characters long");
        }
        return new Description(trimmedValue);
    }
}