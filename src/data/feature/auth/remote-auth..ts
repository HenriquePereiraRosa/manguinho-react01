import { HttpStatusCode, PostClient } from '@/data/protocols/http';
import { InvalidCredentialsError } from '@/domain/errors/Invalid-credentials-error';
import { AuthenticationParams } from '@/domain/feature/auth';

export class RemoteAuth {
  constructor (
    private readonly url: string,
    private readonly postClient: PostClient
  ) { }

  async auth (params?: AuthenticationParams): Promise<void> {
    const res = await this.postClient.post({
      url: this.url,
      body: params
    })

    if(res.statusCode == HttpStatusCode.unauthorized) {
      throw new InvalidCredentialsError()
    }

    return Promise.resolve()
  }
}
