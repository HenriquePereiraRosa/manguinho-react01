import { type IValidation } from '@/data/protocols/validation/validation'
import { type IFieldValidation } from '@/validation/protocols/field-validation'

export class ValidationComposite implements IValidation {
  constructor(readonly validators: IFieldValidation[]) { }

  validate(fieldName: string, value: string): string {
    const validators = this.validators.filter(v => v.field === fieldName)

    for (const validator of validators) {
      const error = validator.validate(value)

      if (error) {
        return error.message
      }
    }

    return ''
  }
}
