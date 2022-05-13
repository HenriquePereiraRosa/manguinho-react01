import { PostClient, PostClientParams } from "../protocols/http"
import { HttpResponse, HttpStatusCode } from "../protocols/http"

export class PostClientSpy implements PostClient {
  url?: string
  body?: any
  response: HttpResponse = {
    statusCode: HttpStatusCode.noContent
  }

  async post(params: PostClientParams): Promise<HttpResponse> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve(this.response)
  }
}