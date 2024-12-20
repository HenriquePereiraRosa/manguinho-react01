import { faker } from '@faker-js/faker'
import { EmailValidation } from '../validators/email/email-validation'
import { MinLengthValidation } from '../validators/min-length/min-length-validation'
import { RequiredFieldValidation } from '../validators/required-fields/required-field-validation'
import { ValidationBuilder as sut } from './validation-builder'
import { FieldsEqualityValidation } from '../validators/fields-equality/fields-equality-validation'

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(field)])
  })

  test('Should return EmailValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).email().build()
    expect(validations).toEqual([new EmailValidation(field)])
  })

  test('Should return MinLengthValidation', () => {
    const field = faker.database.column()
    const length = faker.datatype.number()
    const validations = sut.field(field).min(length).build()
    expect(validations).toEqual([new MinLengthValidation(field, length)])
  })

  test('Should return a list of validations', () => {
    const field = faker.database.column()
    const length = faker.datatype.number()
    const validations = sut.field(field).required().min(length).email().build()
    expect(validations).toEqual(
      [new RequiredFieldValidation(field),
        new MinLengthValidation(field, length),
        new EmailValidation(field)
      ])
  })

  test('Should return FieldsEqualityValidation', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const validations = sut.field(field).sameAs(fieldToCompare).build()
    expect(validations).toEqual([new FieldsEqualityValidation(field, fieldToCompare)])
  })
})
