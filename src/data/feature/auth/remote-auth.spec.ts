import { PostClientSpy } from '../../test/mock-http-client'
import { RemoteAuth } from './remote-auth.'


describe('RemoteAuth', () => {
  it('Should call PostClient with correct URL', async () => {
    const url = 'any_url'
    const postClientSpy = new PostClientSpy()
    const sut = new RemoteAuth(url, postClientSpy)
    await sut.auth()
    expect(postClientSpy.url).toBe(url)
  })
})
