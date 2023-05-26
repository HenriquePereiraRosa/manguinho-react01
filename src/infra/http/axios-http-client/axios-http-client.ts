import { type PostClientParams } from '@/data/protocols/http'
import axios from 'axios'

export class AxiosHttpClient {
  async post (params: PostClientParams<any>): Promise<void> {
    await axios(params.url)
  }
}
