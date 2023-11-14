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

const makeSut = (field: string[]): SutTypes => {
  const fieldValidationSpies = [
    new FieldValidationSpy(field[0]),
    new FieldValidationSpy(field[1])]

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
    const field = [faker.database.column(), faker.database.column()]
    const { sut, fieldValidationSpies } = makeSut(field)
    fieldValidationSpies[0].error = error

    const errorSut = sut.validate(field[0], faker.word.conjunction(3))

    expect(errorSut).toBe(error.message)
  })

  test('Should stop validation on the first error', () => {
    const lError01 = makeError()
    const lError02 = makeError()
    const field = faker.database.column()
    const fields = [field, field]
    const { sut, fieldValidationSpies } = makeSut(fields)
    fieldValidationSpies[0].error = lError01
    fieldValidationSpies[1].error = lError02

    const errorSut = sut.validate(fields[0], faker.word.conjunction(3))

    expect(errorSut).toBe(lError01.message)
  })

  test('Should pass if fields are valid', () => {
    const field = faker.database.column()
    const fields = [field, field]
    const { sut } = makeSut(fields)

    const errorSut = sut.validate(fields[0], faker.word.conjunction(3))

    expect(errorSut).toBeFalsy()
  })
})
