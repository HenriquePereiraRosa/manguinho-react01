import { FieldsNotEqualError } from '@/validation/errors'
import { FieldsEqualityValidation } from './fields-equality-validation'
import faker from '@faker-js/faker'

const makeSut = (): FieldsEqualityValidation =>
  new FieldsEqualityValidation(faker.database.column(), faker.database.column())

describe('FieldsEqualityValidation', () => {
  test('Should return error if fields are NOT EQUAL', () => {
    const value = faker.random.word()
    const valueToCompare = faker.random.word()

    const sut = makeSut()
    const error = sut.validate([
      value,
      valueToCompare
    ])

    expect(error).toEqual(new FieldsNotEqualError())
  })

  test('Should return falsy if fields are equal', () => {
    const value = faker.random.word()

    const sut = makeSut()
    const error = sut.validate([
      value,
      value
    ])

    expect(error).toBeFalsy()
  })
})
