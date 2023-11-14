import { type IFieldValidation } from '../protocols/field-validation'
import { EmailValidation } from '../validators/email/email-validation'
import { MaxLengthValidation } from '../validators/max-length/max-length-validation'
import { MinLengthValidation } from '../validators/min-length/min-length-validation'
import { RequiredFieldValidation } from '../validators/required-fields/required-field-validation'
import { NameValidation } from '../validators/name/name-validation'
import { FieldsEqualityValidation } from '../validators/fields-equality/fields-equality-validation'

export class ValidationBuilder {
  private constructor(
    private readonly fieldName: string,
    private readonly validations: IFieldValidation[]
  ) { }

  static field(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, [])
  }

  required(): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName))
    return this
  }

  name(): ValidationBuilder {
    this.validations.push(new NameValidation(this.fieldName))
    return this
  }

  email(): ValidationBuilder {
    this.validations.push(new EmailValidation(this.fieldName))
    return this
  }

  min(length: number): ValidationBuilder {
    this.validations.push(new MinLengthValidation(this.fieldName, length))
    return this
  }

  max(length: number): ValidationBuilder {
    this.validations.push(new MaxLengthValidation(this.fieldName, length))
    return this
  }

  sameAs (fieldToCompare: string): ValidationBuilder {
    this.validations.push(new FieldsEqualityValidation(this.fieldName, fieldToCompare))
    return this
  }

  build(): IFieldValidation[] {
    return this.validations
  }
}
