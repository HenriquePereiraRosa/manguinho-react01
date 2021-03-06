import { HttpStatusCode } from '@/data/protocols/http'
import { PostClientSpy } from '@/data/test/mock-http-client'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { InvalidParametersError } from '@/domain/errors/invalid-perameters-error'
import { NotFoundError } from '@/domain/errors/not-found-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { AuthenticationParams } from '@/domain/feature/auth'
import { AccountModel } from '@/domain/model/account-model'
import { mockAccountModel } from '@/domain/test/mock-account'
import { mockAuth } from '@/domain/test/mock-auth'
import { RemoteAuth } from './remote-auth'

type SutTypes = {
  sut: RemoteAuth,
  postClientSpy: PostClientSpy<AuthenticationParams, AccountModel>
}

const makeSut = (url: string = 'any_url'): SutTypes => {
  const postClientSpy = new PostClientSpy<AuthenticationParams, AccountModel>()
  const sut = new RemoteAuth(url, postClientSpy)
  return {
    sut,
    postClientSpy
  }
}

describe('RemoteAuth', () => {

  it('Should throw InvalidParameters if PostClient returns 400', async () => {
    const { sut, postClientSpy } = makeSut()
    postClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.auth(mockAuth())
    expect(promise).rejects.toThrow(new InvalidParametersError())
  })

  it('Should throw InvalidCredentialsError if PostClient returns 401', async () => {
    const { sut, postClientSpy } = makeSut()
    postClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    const promise = sut.auth(mockAuth())
    expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  it('Should throw NotFoundError if PostClient returns 404', async () => {
    const { sut, postClientSpy } = makeSut()
    postClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.auth(mockAuth())
    expect(promise).rejects.toThrow(new NotFoundError())
  })

  it('Should throw UnexpectedError if PostClient returns 500', async () => {
    const { sut, postClientSpy } = makeSut()
    postClientSpy.response = {
      statusCode: HttpStatusCode.internalError
    }
    const promise = sut.auth(mockAuth())
    expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError for unexpected returns', async () => {
    const { sut } = makeSut()
    const promise = sut.auth(mockAuth())
    expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should call PostClient with correct URL (http 200)', async () => {
    const url = 'any_url'
    const { sut, postClientSpy } = makeSut(url)
    postClientSpy.response = {
      statusCode: HttpStatusCode.ok
    }
    await sut.auth()
    expect(postClientSpy.response.statusCode).toEqual(HttpStatusCode.ok)
    expect(postClientSpy.url).toBe(url)
  })

  it('Should call PostClient with correct Body (http 200)', async () => {
    const authParams = mockAuth()
    const { sut, postClientSpy } = makeSut()
    postClientSpy.response = {
      statusCode: HttpStatusCode.ok
    }
    await sut.auth(authParams)
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
    const account	= await sut.auth(mockAuth())
    expect(account).toBe(result)
  })
})