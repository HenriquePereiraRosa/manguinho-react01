import { AccountCreation } from '@/data/usecases/create-account/create-account'
import { type IAccountCreation } from '@/domain/usecases'
import { makeApiUrl } from '../../http/api-url-factory'
import { makeAxiosHttpClient } from '../../http/axios-http-client-factory'

export const makeAccountCreation = (): IAccountCreation => {
  const apiUrl = makeApiUrl('/login')
  return new AccountCreation(apiUrl, makeAxiosHttpClient())
}
