import { ValidationError } from "../errors/validation-error";
import { ValidatorRules } from "./validator-rules";

type Values = {
  value: any;
  property: string;
};

type AssertProps = {
  value: any;
  property: string;
  rule: keyof ValidatorRules;
  error: string;
  params?: any;
};

function assertIsValid({ value, property, rule, error, params }: AssertProps) {
  expect(() => {
    ValidatorRules.values(value, property)[rule](params);
  }).not.toThrow(new ValidationError(error));
}

function assertIsInvalid({
  value,
  property,
  rule,
  error,
  params,
}: AssertProps) {
  expect(() => {
    ValidatorRules.values(value, property)[rule](params);
  }).toThrow(new ValidationError(error));
}

describe("Validator rules unit test", () => {
  test("values method", () => {
    const validator = ValidatorRules.values("value", "field");

    expect(validator).toBeInstanceOf(ValidatorRules);

    expect(validator["value"]).toBe("value");
    expect(validator["property"]).toBe("field");
  });

  test("required validation rules", () => {
    // invalid
    let arrange: Values[] = [
      {
        value: null,
        property: "field",
      },
      {
        value: undefined,
        property: "field",
      },
      {
        value: "",
        property: "field",
      },
    ];

    arrange.forEach((item) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "required",
        error: "The field is required",
      });
    });

    //valid
    arrange = [
      {
        value: 0,
        property: "field",
      },
      {
        value: "some value",
        property: "field",
      },
      {
        value: true,
        property: "field",
      },
    ];

    arrange.forEach((item) => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "required",
        error: "The field is required",
      });
    });
  });

  test("string validation rule", () => {
    // invalid
    let arrange: Values[] = [
      {
        value: 5,
        property: "field",
      },
      {
        value: 10,
        property: "field",
      },
      {
        value: {},
        property: "field",
      },
    ];

    arrange.forEach((item) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "string",
        error: "The field must be a string",
      });
    });

    //valid
    arrange = [
      {
        value: "Emanuel",
        property: "field",
      },
      {
        value: "some value",
        property: "field",
      },
      {
        value: "Test",
        property: "field",
      },
    ];

    arrange.forEach((item) => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "string",
        error: "The field must be a string",
      });
    });
  });

  test("maxLength validation rule", () => {
    // invalid
    let arrange: Values[] = [
      {
        value: "asdefg",
        property: "field",
      },
      {
        value: "some value",
        property: "field",
      },
      {
        value: "123456",
        property: "field",
      },
    ];

    arrange.forEach((item) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "maxLength",
        error: "The field must be less or equal than 5 characters",
        params: 5,
      });
    });

    //valid
    arrange = [
      {
        value: undefined,
        property: "field",
      },
      {
        value: null,
        property: "field",
      },
      {
        value: "asdef",
        property: "field",
      },
      {
        value: "some",
        property: "field",
      },
      {
        value: 12345,
        property: "field",
      },
    ];

    arrange.forEach((item) => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "maxLength",
        error: "The field must be less or equal than 5 characters",
        params: 5,
      });
    });
  });

  test("boolean validation rule", () => {
    // invalid
    let arrange: Values[] = [
      {
        value: 5,
        property: "field",
      },
      {
        value: "true",
        property: "field",
      },
      {
        value: "false",
        property: "field",
      },
    ];

    arrange.forEach((item) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "boolean",
        error: "The field must be a boolean",
      });
    });

    //valid
    arrange = [
      {
        value: true,
        property: "field",
      },
      {
        value: false,
        property: "field",
      },
    ];

    arrange.forEach((item) => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "boolean",
        error: "The field must be a boolean",
      });
    });
  });

  it("should throw a validation error when combine two or more validation rules", () => {
    let validator = ValidatorRules.values(null, "field");

    expect(() => validator.required().string().maxLength(5)).toThrow(
      new ValidationError("The field is required")
    );

    validator = ValidatorRules.values(5, "field");

    expect(() => validator.required().string().maxLength(5)).toThrow(
      new ValidationError("The field must be a string")
    );

    validator = ValidatorRules.values("aaaaaa", "field");

    expect(() => validator.required().string().maxLength(5)).toThrow(
      new ValidationError("The field must be less or equal than 5 characters")
    );

    validator = ValidatorRules.values(null, "field");

    expect(() => validator.required().boolean()).toThrow(
      new ValidationError("The field is required")
    );

    validator = ValidatorRules.values(6, "field");

    expect(() => validator.required().boolean()).toThrow(
      new ValidationError("The field must be a boolean")
    );
  });

  it("should valid when combine two or more validation rules", () => {
    expect.assertions(0);
    ValidatorRules.values("test", "field").required().string();
    ValidatorRules.values("aaaa", "field").required().string().maxLength(5);

    ValidatorRules.values(true, "field").required().boolean();
    ValidatorRules.values(false, "field").required().boolean();
  });
});
