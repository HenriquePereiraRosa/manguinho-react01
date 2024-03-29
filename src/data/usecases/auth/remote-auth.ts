import { HttpStatusCode, type IPostClient } from '@/data/protocols/http'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { InvalidParametersError } from '@/domain/errors/invalid-perameters-error'
import { NotFoundError } from '@/domain/errors/not-found-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { type AccountModel } from '@/domain/model/account-model'
import { type IAuthentication, type TAuthenticationParams } from '@/domain/usecases/authentication/auth'

export class RemoteAuth implements IAuthentication {
  constructor(
    private readonly url: string,
    private readonly postClient: IPostClient<TAuthenticationParams, AccountModel>
  ) { }

  async doAuth(params?: TAuthenticationParams): Promise<AccountModel | undefined> {
    const res = await this.postClient.post({
      url: this.url,
      body: params
    })

    switch (res.statusCode) {
      case HttpStatusCode.ok: return res.body
      case HttpStatusCode.badRequest: throw new InvalidParametersError()
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      case HttpStatusCode.notFound: throw new NotFoundError()
      case HttpStatusCode.internalError: throw new UnexpectedError()
      default: throw new UnexpectedError()
    }
  }
}
