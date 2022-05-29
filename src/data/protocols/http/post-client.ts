import { HttpResponse } from "./http-response"

export type PostClientParams<T> = {
  url: string
  body?: T
}
export interface PostClient<T, R> {
  post(params?: PostClientParams<T>): Promise<HttpResponse<R>>
}
