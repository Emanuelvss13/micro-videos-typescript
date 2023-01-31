import { validate as uuidValidate } from "uuid";
import InvalidUUIDError from "../../errors/invalid-uuid.error";
import { UniqueEntityId } from "../unique-entity-id.vo";

const spyValidateMethod = () => {
  return jest.spyOn(UniqueEntityId.prototype as any, "validate");
};

describe(" UniqueEntityId Unit tests", () => {
  it("Should throw an error when uuid is invalid", () => {
    const validateSpy = spyValidateMethod();
    expect(() => new UniqueEntityId("invalid uuid")).toThrow(
      new InvalidUUIDError()
    );

    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a uuid in constructor", () => {
    const validateSpy = spyValidateMethod();
    const uuid = "c1128e84-2a33-49c3-93b0-9cf1dc718358";

    const vo = new UniqueEntityId(uuid);

    expect(vo.value).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a uuid in constructor", () => {
    const validateSpy = spyValidateMethod();
    const uuid = "c1128e84-2a33-49c3-93b0-9cf1dc718358";

    const vo = new UniqueEntityId(uuid);

    expect(uuidValidate(vo.value)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});
