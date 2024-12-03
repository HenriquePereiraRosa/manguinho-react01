import { FieldsNotEqualError } from '../../errors'
import type { IFieldValidation } from '../../protocols/field-validation'

export class FieldsEqualityValidation implements IFieldValidation {
  constructor(
    readonly field: string,
    private readonly fieldToCompare: string) { }

  validate(values: string[]): Error | null {
    const value = values[0]
    const valueToCompare = values[1]

    if (value === valueToCompare) {
      return null
    }

    return new FieldsNotEqualError()
  }
}
