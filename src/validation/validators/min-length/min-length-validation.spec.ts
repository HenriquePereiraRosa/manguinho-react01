import { MinLengthFieldError } from '@/validation/errors'
import { MinLengthValidation } from './min-length-validation'

const MIN_LENGTH: number = 8
const makeSut = (): MinLengthValidation =>
  new MinLengthValidation('field', MIN_LENGTH)

describe('EmailValidation', () => {
  test('Should return error if field is <= than Min', () => {
    const sut = makeSut()
    const stringLessThanMin = 'test123'
    const error = sut.validate(stringLessThanMin)

    expect(error).toEqual(new MinLengthFieldError(MIN_LENGTH))
  })

  test('Should return falsy if field is >= than MIN', () => {
    const sut = makeSut()
    const stringGreaterThanMin = 'test1234'
    const error = sut.validate(stringGreaterThanMin)

    expect(error).toBeFalsy()
  })
})
