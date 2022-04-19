export type PostClientParams = {
  url: string
  body?: object
}
export interface PostClient {
  post(params?: PostClientParams): Promise<void>
}
