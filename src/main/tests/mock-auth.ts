import { type IAuthentication, type IAuthenticationParams } from '../../domain/usecases'
import { faker } from '@faker-js/faker'
import { type AccountModel } from '../../domain/model/account-model'
import { mockAccountModel } from './mock-account'

export const mockAuthParams = (): IAuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export class AuthenticationSpy implements IAuthentication {
  params: IAuthenticationParams
  callsCount: number = 0
  account: AccountModel = mockAccountModel()

  async doAuth (params: IAuthenticationParams): Promise<AccountModel> {
    this.params = params
    this.callsCount++
    return Promise.resolve(this.account)
  }
}
