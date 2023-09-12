import { MaxLengthFieldError } from '@/validation/errors'
import { MaxLengthValidation } from './max-length-validation'

const MAX_LENGTH: number = 8
const makeSut = (): MaxLengthValidation =>
  new MaxLengthValidation('field', MAX_LENGTH)

describe('EmailValidation', () => {
  test('Should return error if field is >= than Max', () => {
    const sut = makeSut()
    const stringLessThanMin = 'test12345'
    const error = sut.validate(stringLessThanMin)

    expect(error).toEqual(new MaxLengthFieldError(MAX_LENGTH))
  })

  test('Should return falsy if field is <= than Max', () => {
    const sut = makeSut()
    const stringGreaterThanMin = 'test1234'
    const error = sut.validate(stringGreaterThanMin)

    expect(error).toBeFalsy()
  })
})
