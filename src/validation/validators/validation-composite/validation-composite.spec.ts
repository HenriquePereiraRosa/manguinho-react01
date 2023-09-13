import { type IFieldValidation } from '@/validation/protocols/field-validation'
import { ValidationComposite } from './validation-composite'
import faker from '@faker-js/faker'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationSpies: FieldValidationSpy[]
}
class FieldValidationSpy implements IFieldValidation {
  public error: Error

  constructor(readonly field: string) { }

  validate(value: string): Error {
    return this.error
  }
}

const makeSut = (fieldNames: string[]): SutTypes => {
  const fieldValidationSpies = [
    new FieldValidationSpy(fieldNames[0]),
    new FieldValidationSpy(fieldNames[1])]

  const sut = new ValidationComposite(fieldValidationSpies)

  return {
    sut,
    fieldValidationSpies
  }
}
const makeError = (): Error => {
  return new Error(faker.random.words(3))
}

describe('RequiredFieldValidation', () => {
  test('Should return error if any validation fails', () => {
    const error = makeError()
    const fieldNames = [faker.database.column(), faker.database.column()]
    const { sut, fieldValidationSpies } = makeSut(fieldNames)
    fieldValidationSpies[0].error = error

    const errorSut = sut.validate(fieldNames[0], 'any_value')

    expect(errorSut).toBe(error.message)
  })

  test('Should stop validation on the first error', () => {
    const lError01 = makeError()
    const lError02 = makeError()
    const fieldName = faker.database.column()
    const fieldNames = [fieldName, fieldName]
    const { sut, fieldValidationSpies } = makeSut(fieldNames)
    fieldValidationSpies[0].error = lError01
    fieldValidationSpies[1].error = lError02

    const errorSut = sut.validate(fieldNames[0], 'any_value')

    expect(errorSut).toBe(lError01.message)
  })

  test('Should pass if fields are valid', () => {
    const fieldName = faker.database.column()
    const fieldNames = [fieldName, fieldName]
    const { sut } = makeSut(fieldNames)

    const errorSut = sut.validate(fieldNames[0], 'any_value')

    expect(errorSut).toBeFalsy()
  })
})
