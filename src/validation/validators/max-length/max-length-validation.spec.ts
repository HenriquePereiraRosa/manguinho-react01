import { MaxLengthFieldError } from '@/validation/errors'
import { MaxLengthValidation } from './max-length-validation'
import faker from '@faker-js/faker'

const MAX_LENGTH: number = 8
const makeSut = (): MaxLengthValidation =>
  new MaxLengthValidation('field', MAX_LENGTH)

describe('EmailValidation', () => {
  test('Should return error if field is >= than Max', () => {
    const sut = makeSut()
    const stringLessThanMin = faker.random.alphaNumeric(MAX_LENGTH + 1)
    const error = sut.validate(stringLessThanMin)

    expect(error).toEqual(new MaxLengthFieldError(MAX_LENGTH))
  })

  test('Should return falsy if field is <= than Max', () => {
    const sut = makeSut()
    const stringGreaterThanMin = faker.random.alphaNumeric(MAX_LENGTH)
    const error = sut.validate(stringGreaterThanMin)

    expect(error).toBeFalsy()
  })
})
