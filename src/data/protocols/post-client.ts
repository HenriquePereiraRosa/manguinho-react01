export interface PostClient {
  post(url: string): Promise<void>
}
