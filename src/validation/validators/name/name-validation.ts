import { InvalidCharsError } from '../../errors'
import type { IFieldValidation } from '../../protocols/field-validation'

export class NameValidation implements IFieldValidation {
  constructor(readonly fieldName: string) { }
  validate(value: string): Error | null {
    if (value.match(/^(?![\s.]+$)[a-zA-Z\s]*$/)) {
      return null
    }

    if (!value) {
      return null
    }

    return new InvalidCharsError()
  }
}
