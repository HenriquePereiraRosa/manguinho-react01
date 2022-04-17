import { PostClientSpy } from '../../test/mock-http-client'
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
})
