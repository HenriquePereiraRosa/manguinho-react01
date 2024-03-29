import { MinLengthFieldError } from '../../errors'
import type { IFieldValidation } from '../../protocols/field-validation'

export class MinLengthValidation implements IFieldValidation {
  constructor(
    readonly fieldName: string,
    private readonly minLength: number) { }

  validate(value: string): Error | null {
    if (value.length >= this.minLength) {
      return null
    }

    return new MinLengthFieldError(this.minLength)
  }
}
