import { PostClient, PostClientParams } from "../protocols"

export class PostClientSpy implements PostClient {
  url?: string
  body?: object

  async post(params: PostClientParams): Promise<void> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve()
  }
}