import { faker } from '@faker-js/faker'
import { InvalidCharsError } from '@/validation/errors'
import { NameValidation } from './name-validation'

const makeSut = (): NameValidation =>
  new NameValidation('text')

describe('TextValidation', () => {
  test('Should return error if text is INVALID', () => {
    const sut = makeSut()
    const error = sut.validate('email123.server.com')

    expect(error).toEqual(new InvalidCharsError())
  })

  test('Should pass if text is VALID', () => {
    const sut = makeSut()
    const error = sut.validate(faker.name.findName().replace('.', ''))

    expect(error).toBeFalsy()
  })

  test('Should pass if email is empty', () => {
    const sut = makeSut()
    const error = sut.validate('')

    expect(error).toBeFalsy()
  })
})
