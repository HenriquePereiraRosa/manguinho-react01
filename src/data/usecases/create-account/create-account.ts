import { HttpStatusCode, type IPostClient } from '@/data/protocols/http'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { InvalidParametersError } from '@/domain/errors/invalid-perameters-error'
import { NotFoundError } from '@/domain/errors/not-found-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { type AccountModel } from '@/domain/model/account-model'
import { type ICreateAccount, type ICreateAccountParams } from '@/domain/usecases'

export class CreateAccount implements ICreateAccount {
  constructor(
    private readonly url: string,
    private readonly postClient: IPostClient<ICreateAccountParams, AccountModel>
  ) { }

  async create(params: ICreateAccountParams): Promise<AccountModel | undefined> {
    const res = await this.postClient.post({
      url: this.url,
      body: params
    })

    if (res.statusCode >= 200 && res.statusCode < 300) {
      return res.body
    } else {
      switch (res.statusCode) {
        case HttpStatusCode.badRequest: throw new InvalidParametersError()
        case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
        case HttpStatusCode.notFound: throw new NotFoundError()
        default: throw new UnexpectedError()
      }
    }
  }
}