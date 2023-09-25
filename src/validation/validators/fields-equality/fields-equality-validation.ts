import { FieldsNotEqualError } from '../../errors'
import type { IFieldValidation } from '../../protocols/field-validation'

export class FieldsEqualityValidation implements IFieldValidation {
  constructor(
    readonly fieldName: string,
    private readonly valueToCompare: string) { }

  validate(value: string): Error | null {
    if (value === this.valueToCompare) {
      return null
    }

    return new FieldsNotEqualError()
  }
}
