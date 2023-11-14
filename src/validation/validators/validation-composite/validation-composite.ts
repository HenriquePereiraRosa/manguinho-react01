import { type IValidation } from '@/data/protocols/validation/validation'
import { type IFieldValidation } from '@/validation/protocols/field-validation'

export class ValidationComposite implements IValidation {
  constructor(readonly validators: IFieldValidation[]) { }

  static build(validators: IFieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators)
  }

  validate(field: string, value: string): string {
    const validators = this.validators.filter(v => v.field === field)

    for (const validator of validators) {
      const error = validator.validate(value)

      if (error) {
        return error.message
      }
    }

    return ''
  }
}
