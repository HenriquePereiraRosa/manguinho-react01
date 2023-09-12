import { InvalidFieldError } from '@/validation/errors'
import faker from '@faker-js/faker'
import { EmailValidation } from './email-validation'

const makeSut = (): EmailValidation =>
  new EmailValidation('email')

describe('EmailValidation', () => {
  test('Should return error if email is INVALID', () => {
    const sut = makeSut()
    const error = sut.validate('email123.server.com')

    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if email is VALID', () => {
    const sut = makeSut()
    const error = sut.validate(faker.internet.email())

    expect(error).toBeFalsy()
  })
})
