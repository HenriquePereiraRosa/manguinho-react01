import { PostClient } from '../../protocols/post-client';

export class RemoteAuth {
  constructor (
    private readonly url: string,
    private readonly postClient: PostClient
  ) { }

  async auth (): Promise<void> {
    await this.postClient.post(this.url)
  }
}
