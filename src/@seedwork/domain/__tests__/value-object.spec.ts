import { Valueobject } from "../value-objects";

class StubValueObject extends Valueobject {}

describe("Value Object unit Test", () => {
  it("Should set a value", () => {
    let vo = new StubValueObject("string value");

    expect(vo.value).toBe("string value");

    vo = new StubValueObject({ prop1: "value1" });

    expect(vo.value).toStrictEqual({ prop1: "value1" });
  });

  it("should convert to a string", () => {
    const date = new Date();
    const arrange = [
      {
        received: undefined,
        expected: "undefined",
      },
      { received: null, expected: "null" },
      {
        received: date,
        expected: date.toString(),
      },
      {
        received: "",
        expected: "",
      },
      {
        received: 1,
        expected: "1",
      },
      {
        received: 0,
        expected: "0",
      },
      {
        received: 5,
        expected: "5",
      },
      {
        received: true,
        expected: "true",
      },
      {
        received: false,
        expected: "false",
      },
      {
        received: true,
        expected: "true",
      },
      {
        received: { prop1: "value1" },
        expected: JSON.stringify({ prop1: "value1" }),
      },
    ];

    arrange.forEach((value) => {
      const vo = new StubValueObject(value.received);
      expect(vo + "").toBe(value.expected);
    });
  });
});
