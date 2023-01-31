import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import InvalidUUIDError from "../errors/invalid-uuid.error";
import { Valueobject } from "./value-objects";

export class UniqueEntityId extends Valueobject<string> {
  constructor(readonly id?: string) {
    super(id ?? uuidv4());
    this.validate();
  }

  validate() {
    const isValid = uuidValidate(this.value);

    if (!isValid) {
      throw new InvalidUUIDError();
    }
  }
}
