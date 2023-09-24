import faker from '@faker-js/faker'
import { type IPostClient, type IPostClientParams, type HttpResponse, HttpStatusCode } from '../../data/protocols/http'

export const mockPostRequest = (): IPostClientParams<any> => ({
  url: faker.internet.url(),
  body: {
    name: faker.name.firstName(),
    email: faker.internet.email()
  }
})

export class PostClientSpy<T, R> implements IPostClient<T, R> {
  url?: string
  body?: T
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.noContent
  }

  async post(params: IPostClientParams<T>): Promise<HttpResponse<R>> {
    this.url = params.url
    this.body = params.body
    if (!this.response.statusCode) {
      this.response.statusCode = HttpStatusCode.ok
    }

    return this.response
  }
}
