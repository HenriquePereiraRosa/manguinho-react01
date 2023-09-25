import { FieldsNotEqualError } from '@/validation/errors'
import { FieldsEqualityValidation } from './fields-equality-validation'
import faker from '@faker-js/faker'

const makeSut = (valueToCompare: string): FieldsEqualityValidation =>
  new FieldsEqualityValidation(faker.database.column(), valueToCompare)

describe('FieldsEqualityValidation', () => {
  test('Should return error if fields are not EQUAL', () => {
    const value = faker.random.word()
    const valueToCompare = faker.random.word()
    const sut = makeSut(value)
    const error = sut.validate(valueToCompare)

    expect(error).toEqual(new FieldsNotEqualError())
  })

  test('Should return falsy if fields are equal', () => {
    const value = faker.random.word()
    const valueToCompare = value
    const sut = makeSut(value)
    const error = sut.validate(valueToCompare)

    expect(error).toBeFalsy()
  })
})
