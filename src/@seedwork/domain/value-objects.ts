import { deepFreeze } from "./utils/object";

export abstract class Valueobject<Value = any> {
  protected readonly _value: Value;

  constructor(value: Value) {
    this._value = deepFreeze(value);
  }

  get value(): Value {
    return this._value;
  }

  toString = () => {
    if (typeof this.value !== "object" || this.value === null) {
      try {
        console.log(this.value!.toString());

        return this.value!.toString();
      } catch {
        return this.value + "";
      }
    }
    const valueStr = this.value.toString();
    return valueStr === "[object Object]"
      ? JSON.stringify(this._value)
      : valueStr;
  };
}
