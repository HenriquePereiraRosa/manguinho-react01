import { RemoteAuth } from '@/data/usecases/auth/remote-auth'
import { makeAxiosHttpClient } from '../../http/axios-http-client-factory'
import { makeApiUrl } from '../../http/api-url-factory'
import { type IAuthentication } from '@/domain/usecases'

export const makeRemoteAuth = (): IAuthentication => {
  const apiUrl = makeApiUrl('/login')
  return new RemoteAuth(apiUrl, makeAxiosHttpClient())
}
