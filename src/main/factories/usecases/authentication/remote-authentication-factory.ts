import { RemoteAuth } from '@/data/feature/auth/remote-auth'
import { makeAxiosHttpClient } from '../../http/axios-http-client-factory'
import { type IAuthentication } from '@/domain/feature/auth'
import { makeApiUrl } from '../../http/api-url-factory'

export const makeRemoteAuth = (): IAuthentication => {
  const apiUrl = makeApiUrl('/login')
  return new RemoteAuth(apiUrl, makeAxiosHttpClient())
}
