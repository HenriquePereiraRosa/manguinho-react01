import { PostClient } from "../protocols"

export class PostClientSpy implements PostClient {
  url?: string

  async post(url: string): Promise<void> {
    this.url = url
    return Promise.resolve()
  }
}