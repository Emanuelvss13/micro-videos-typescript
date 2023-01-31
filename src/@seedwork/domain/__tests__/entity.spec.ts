import { validate as uuidValidate } from "uuid";
import { Entity } from "../entity";
import { UniqueEntityId } from "./../unique-entity-id.vo";

class StubEntity extends Entity<{ prop1: string; prop2: number }> {}

describe("Entity unit tests", () => {
  it("should set props and id", () => {
    const arrange = { prop1: "string", prop2: 10 };

    const entity = new StubEntity(arrange);

    expect(entity.props).toStrictEqual(arrange);
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(uuidValidate(entity.id)).toBeTruthy();
  });

  it("should accepet a valid uuid", () => {
    const arrange = { prop1: "string", prop2: 10 };
    const uniqueEntityId = new UniqueEntityId();
    const entity = new StubEntity(arrange, uniqueEntityId);
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(uuidValidate(entity.id)).toBeTruthy();
  });

  it("should convert a entity to a javascript object", () => {
    const arrange = { prop1: "string", prop2: 10 };

    const uniqueEntityId = new UniqueEntityId();

    const entity = new StubEntity(arrange, uniqueEntityId);

    expect(entity.toJSON()).toStrictEqual({
      id: entity.id,
      ...arrange,
    });
  });
});
