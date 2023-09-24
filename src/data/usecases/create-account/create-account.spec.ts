import { type ICreateAccountParams } from '@/domain/usecases'
import { CreateAccount } from './create-account'
import { type AccountModel } from '@/domain/model/account-model'
import { PostClientSpy, mockCreateAccoutParams } from '@/main/test'
import faker from '@faker-js/faker'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors/unexpected-error'

type SutTypes = {
  sut: CreateAccount
  postClientSpy: PostClientSpy<ICreateAccountParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const postClientSpy = new PostClientSpy<ICreateAccountParams, AccountModel>()
  const sut = new CreateAccount(url, postClientSpy)
  return {
    sut,
    postClientSpy
  }
}

describe('CreateAccount', () => {
  it('Should call PostClient with the correct url', async () => {
    const url = faker.internet.url()
    const { sut, postClientSpy } = makeSut(url)
    await sut.create(mockCreateAccoutParams())

    expect(postClientSpy.url).toBe(url)
  })

  it('Should call PostClient with the correct body', async () => {
    const { sut, postClientSpy } = makeSut()
    const createAccountParams = mockCreateAccoutParams()
    await sut.create(createAccountParams)

    expect(postClientSpy.body).toEqual(createAccountParams)
  })

  it('Should throw Error if PostClient returns 401', async () => {
    const { sut, postClientSpy } = makeSut()
    postClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    const response = sut.create(mockCreateAccoutParams())
    await expect(response).rejects.toThrow(new InvalidCredentialsError())
  })

  it('Should throw UnexpectedError if PostClient returns 500', async () => {
    const { sut, postClientSpy } = makeSut()
    postClientSpy.response = {
      statusCode: HttpStatusCode.internalError
    }
    const response = sut.create(mockCreateAccoutParams())
    await expect(response).rejects.toThrow(new UnexpectedError())
  })
})
