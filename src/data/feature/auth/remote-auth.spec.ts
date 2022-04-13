import { RemoteAuth } from './remote-auth.'

interface PostClient {
  post(url: string): Promise<void>
}

describe('RemoteAuth', () => {
  it('Should call PostClient with correct URL', async () => {
    class PostClientSpy implements PostClient {
      url?: string

      async post (url: string): Promise<void> {
        this.url = url
        return Promise.resolve()
      }
    }
    const url = 'any_url'
    const postClientSpy = new PostClientSpy()
    const sut = new RemoteAuth(url, postClientSpy)
    await sut.auth()
    expect(postClientSpy.url).toBe(url)
  })
})
