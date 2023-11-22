import { HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { InvalidParametersError } from '@/domain/errors/invalid-perameters-error'
import { NotFoundError } from '@/domain/errors/not-found-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { type AccountModel } from '@/domain/model/account-model'
import {
  mockAccountModel,
  mockAuthParams,
  PostClientSpy
} from '@/main/tests'
import { RemoteAuth } from './remote-auth'
import { faker } from '@faker-js/faker'
import { type IAuthenticationParams } from '@/domain/usecases/'

type SutTypes = {
  sut: RemoteAuth
  postClientSpy: PostClientSpy<IAuthenticationParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const postClientSpy = new PostClientSpy<IAuthenticationParams, AccountModel>()
  const sut = new RemoteAuth(url, postClientSpy)
  return {
    sut,
    postClientSpy
  }
}

describe('RemoteAuth', () => {
  it('Should Call PostClient with correct url', async () => {
    const url = faker.internet.url()
    const { sut, postClientSpy } = makeSut(url)
    await sut.doAuth(mockAuthParams())
    expect(postClientSpy.url).toBe(url)
  })

  it('Should throw InvalidParameters if PostClient returns 400', async () => {
    const { sut, postClientSpy } = makeSut()
    postClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.doAuth(mockAuthParams())
    await expect(promise).rejects.toThrow(new InvalidParametersError())
  })

  it('Should throw InvalidCredentialsError if PostClient returns 401', async () => {
    const { sut, postClientSpy } = makeSut()
    postClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    const promise = sut.doAuth(mockAuthParams())
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  it('Should throw NotFoundError if PostClient returns 404', async () => {
    const { sut, postClientSpy } = makeSut()
    postClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.doAuth(mockAuthParams())
    await expect(promise).rejects.toThrow(new NotFoundError())
  })

  it('Should throw UnexpectedError if PostClient returns 500', async () => {
    const { sut, postClientSpy } = makeSut()
    postClientSpy.response = {
      statusCode: HttpStatusCode.internalError
    }
    const promise = sut.doAuth(mockAuthParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError for unexpected returns', async () => {
    const { sut, postClientSpy } = makeSut()
    postClientSpy.response = {
      statusCode: HttpStatusCode.internalError
    }
    const promise = sut.doAuth(mockAuthParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should call PostClient with correct URL (http 200)', async () => {
    const url = faker.internet.url()
    const { sut, postClientSpy } = makeSut(url)
    postClientSpy.response = {
      statusCode: HttpStatusCode.ok
    }
    await sut.doAuth()
    expect(postClientSpy.response.statusCode).toEqual(HttpStatusCode.ok)
    expect(postClientSpy.url).toEqual(url)
  })

  it('Should call PostClient with correct Body (http 200)', async () => {
    const authParams = mockAuthParams()
    const { sut, postClientSpy } = makeSut()
    postClientSpy.response = {
      statusCode: HttpStatusCode.ok
    }
    await sut.doAuth(authParams)
    expect(postClientSpy.response.statusCode).toEqual(HttpStatusCode.ok)
    expect(postClientSpy.body).toEqual(authParams)
  })

  it('Should return AccountModel if HttpPostClient return 200', async () => {
    const { sut, postClientSpy } = makeSut()
    const result = mockAccountModel()
    postClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: result
    }
    const account = await sut.doAuth(mockAuthParams())
    expect(account).toEqual(result)
  })
})
