export interface PostClient {
  post(url: String): Promise<void>
}