import { type HttpResponse } from './http-response'

export type IPostClientParams<T> = {
  url: string
  body?: T
}
export interface IPostClient<T, R> {
  post: (params?: IPostClientParams<T>) => Promise<HttpResponse<R>>
}
