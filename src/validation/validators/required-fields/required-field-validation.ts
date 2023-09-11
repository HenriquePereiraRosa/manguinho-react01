import { RequiredFieldError } from '../../errors'
import type { IFieldValidation } from '../../protocols/field-validation'

export class RequiredFieldValidation implements IFieldValidation {
  constructor(readonly field: string) { }

  validate(value: string): Error | null {
    return value ? null : new RequiredFieldError()
  }
}
