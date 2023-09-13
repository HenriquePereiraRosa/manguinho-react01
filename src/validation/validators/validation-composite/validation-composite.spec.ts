import { type IFieldValidation } from '@/validation/protocols/field-validation'
import { ValidationComposite } from './validation-composite'
import faker from '@faker-js/faker'

class FieldValidationSpy implements IFieldValidation {
  error: Error

  constructor(readonly field: string) { }

  validate(value: string): Error {
    return this.error
  }
}

const makeSut = (errorMessage: string, fieldNames: string[]): ValidationComposite => {
  const fieldValidationSpy01 = new FieldValidationSpy(fieldNames[0])
  const fieldValidationSpy02 = new FieldValidationSpy(fieldNames[1])
  fieldValidationSpy02.error = new Error(errorMessage)

  return new ValidationComposite([
    fieldValidationSpy01,
    fieldValidationSpy02
  ])
}

describe('RequiredFieldValidation', () => {
  test('Should return error if any validation fails', () => {
    const errorMessage = faker.random.words(3)
    const fieldNames = [faker.database.column(), faker.database.column()]
    const sut = makeSut(errorMessage, fieldNames)
    const error = sut.validate(fieldNames[1], 'any_value')

    expect(error).toBe(errorMessage)
  })
  test('Should return error if any validation fails', () => {
    const errorMessage = faker.random.words(3)
    const fieldNames = [faker.database.column(), faker.database.column()]
    const sut = makeSut(errorMessage, fieldNames)
    const error = sut.validate(fieldNames[1], 'any_value')

    expect(error).toBe(errorMessage)
  })
})
