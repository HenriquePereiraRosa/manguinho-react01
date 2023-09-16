import { type HttpResponse, type PostClientParams } from '@/data/protocols/http'
import axios from 'axios'

export class AxiosHttpClient {
  async post(params: PostClientParams<any>): Promise<HttpResponse<any>> {
    const httpResponse = await axios.post(params.url, params.body)
      .then(response => {
        return {
          statusCode: response?.status,
          body: response?.data
        }
      }).catch(error => {
        console.log(error)
        return {
          statusCode: error.response?.status,
          body: error.response?.data
        }
      })

    return httpResponse
  }
}
