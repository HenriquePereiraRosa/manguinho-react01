import { PostClient, PostClientParams } from "../protocols"

export class PostClientSpy implements PostClient {
  url?: string

  async post(params: PostClientParams): Promise<void> {
    this.url = params.url
    return Promise.resolve()
  }
}