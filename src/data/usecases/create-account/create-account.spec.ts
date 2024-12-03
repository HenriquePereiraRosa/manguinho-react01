import { type IAccountCreationParams } from '@/domain/usecases'
import { AccountCreation } from './create-account'
import { type AccountModel } from '@/domain/model/account-model'
import { PostClientSpy, mockAccountModel, mockCreateAccoutParams } from '@/main/tests'
import { faker } from '@faker-js/faker'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { NotFoundError } from '@/domain/errors/not-found-error'
import { InvalidParametersError } from '@/domain/errors/invalid-perameters-error'

type SutTypes = {
  sut: AccountCreation
  postClientSpy: PostClientSpy<IAccountCreationParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const postClientSpy = new PostClientSpy<IAccountCreationParams, AccountModel>()
  const sut = new AccountCreation(url, postClientSpy)
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

  it('Should throw Error if PostClient returns 400', async () => {
    const { sut, postClientSpy } = makeSut()
    postClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const response = sut.create(mockCreateAccoutParams())
    await expect(response).rejects.toThrow(new InvalidParametersError())
  })

  it('Should throw Error if PostClient returns 401', async () => {
    const { sut, postClientSpy } = makeSut()
    postClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    const response = sut.create(mockCreateAccoutParams())
    await expect(response).rejects.toThrow(new InvalidCredentialsError())
  })

  it('Should throw NotFoundError if PostClient returns 404', async () => {
    const { sut, postClientSpy } = makeSut()
    postClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const response = sut.create(mockCreateAccoutParams())
    await expect(response).rejects.toThrow(new NotFoundError())
  })

  it('Should throw UnexpectedError if PostClient returns 500', async () => {
    const { sut, postClientSpy } = makeSut()
    postClientSpy.response = {
      statusCode: HttpStatusCode.internalError
    }
    const response = sut.create(mockCreateAccoutParams())
    await expect(response).rejects.toThrow(new UnexpectedError())
  })

  it('Should return AccountModel if HttpPostClient return 200', async () => {
    const { sut, postClientSpy } = makeSut()
    const result = mockAccountModel()
    postClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: result
    }
    const account = await sut.create(mockCreateAccoutParams())
    expect(account).toEqual(result)
  })
})
