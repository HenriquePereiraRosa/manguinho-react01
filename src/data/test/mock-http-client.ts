import { type PostClient, type PostClientParams , type HttpResponse, HttpStatusCode } from '../protocols/http'

export class PostClientSpy<T, R> implements PostClient<T, R> {
  url?: string
  body?: T
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.noContent
  }

  async post (params: PostClientParams<T>): Promise<HttpResponse<R>> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve(this.response)
  }
}
