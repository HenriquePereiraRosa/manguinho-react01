import { MaxLengthFieldError } from '../../errors'
import type { IFieldValidation } from '../../protocols/field-validation'

export class MaxLengthValidation implements IFieldValidation {
  constructor(
    readonly fieldName: string,
    private readonly maxLength: number) { }

  validate(value: string): Error | null {
    if (value.length <= this.maxLength) {
      return null
    }

    return new MaxLengthFieldError(this.maxLength)
  }
}
