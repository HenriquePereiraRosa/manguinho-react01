export type PostClientParams = {
  url: string
}
export interface PostClient {
  post(params: PostClientParams): Promise<void>
}
