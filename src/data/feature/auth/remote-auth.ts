import { HttpStatusCode, PostClient } from '@/data/protocols/http';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { InvalidParametersError } from '@/domain/errors/invalid-perameters-error';
import { NotFoundError } from '@/domain/errors/not-found-error';
import { UnexpectedError } from '@/domain/errors/unexpected-error';
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

    if(res.statusCode == HttpStatusCode.ok) {
      return Promise.resolve()
    }

    if(res.statusCode == HttpStatusCode.badRequest) {
      throw new InvalidParametersError()
    }
    if(res.statusCode == HttpStatusCode.unauthorized) {
      throw new InvalidCredentialsError()
    }
    if(res.statusCode == HttpStatusCode.notFound) {
      throw new NotFoundError()
    }
    if(res.statusCode == HttpStatusCode.internalError) {
      throw new UnexpectedError()
    }
  }
}
