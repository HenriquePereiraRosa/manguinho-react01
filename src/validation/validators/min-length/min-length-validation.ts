import { MinLengthFieldError } from '../../errors'
import type { IFieldValidation } from '../../protocols/field-validation'

export class MinLengthValidation implements IFieldValidation {
  constructor(
    readonly field: string,
    private readonly minLength: number) { }

  validate(value: string): Error | null {
    if (!value) {
      return null
    }

    if (value.length >= this.minLength) {
      return null
    }

    return new MinLengthFieldError(this.minLength)
  }
}
