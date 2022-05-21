import { HttpStatusCode } from '@/data/protocols/http'
import { PostClientSpy } from '@/data/test/mock-http-client'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { InvalidParametersError } from '@/domain/errors/invalid-perameters-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { mockAuth } from '@/domain/test/mock-auth'
import { RemoteAuth } from './remote-auth.'

type SutTypes = {
  sut: RemoteAuth,
  postClientSpy: PostClientSpy
}

const makeSut = (url: string = 'any_url'): SutTypes => {
  const postClientSpy = new PostClientSpy()
  const sut = new RemoteAuth(url, postClientSpy)
  return {
    sut,
    postClientSpy
  }
}

describe('RemoteAuth', () => {
  it('Should call PostClient with correct URL', async () => {
    const url = 'any_url'
    const { sut, postClientSpy } = makeSut(url)
    await sut.auth()
    expect(postClientSpy.url).toBe(url)
  })

  it('Should call PostClient with correct Body', async () => {
    const authParams = mockAuth()
    const { sut, postClientSpy } = makeSut()
    await sut.auth(authParams)
    expect(postClientSpy.body).toEqual(authParams)
  })


  it('Should throw InvalidCredentialsError if PostClient returns 401', async () => {
    const { sut, postClientSpy } = makeSut()
    postClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    const promise = sut.auth(mockAuth())
    expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  it('Should throw InvalidParameters if PostClient returns 400', async () => {
    const { sut, postClientSpy } = makeSut()
    postClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.auth(mockAuth())
    expect(promise).rejects.toThrow(new InvalidParametersError())
  })


  it('Should throw UnexpectedError if PostClient returns 500', async () => {
    const { sut, postClientSpy } = makeSut()
    postClientSpy.response = {
      statusCode: HttpStatusCode.internalError
    }
    const promise = sut.auth(mockAuth())
    expect(promise).rejects.toThrow(new UnexpectedError())
  })

})