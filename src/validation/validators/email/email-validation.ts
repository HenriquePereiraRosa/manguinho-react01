import { InvalidFieldError } from '../../errors'
import type { IFieldValidation } from '../../protocols/field-validation'

export class EmailValidation implements IFieldValidation {
  constructor(readonly fieldName: string) { }
  validate(value: string): Error | null {
    if (value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      return null
    }

    if (!value) {
      return null
    }

    return new InvalidFieldError()
  }
}
