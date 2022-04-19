import { AuthenticationParams } from '@/domain/feature/auth';
import { PostClient } from '../../protocols/post-client';

export class RemoteAuth {
  constructor (
    private readonly url: string,
    private readonly postClient: PostClient
  ) { }

  async auth (params?: AuthenticationParams): Promise<void> {
    await this.postClient.post({
      url: this.url,
      body: params
    })
  }
}
