import faker from '@faker-js/faker'
import axios from 'axios'
import { AxiosHttpClient } from './axios-http-client'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}
const mockHttpResponse = (): any => ({
  data: faker.random.objectElement(),
  status: faker.random.number()
})
const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.post.mockResolvedValue(mockHttpResponse())
  return mockedAxios
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()
  return {
    sut,
    mockedAxios
  }
}

describe('Axios Http Client', () => {
  it('Should call Axios with correct Url', async () => {
    const params = {
      url: faker.internet.url(),
      body: {
        name: faker.name.firstName(),
        email: faker.internet.email()
      }
    }
    const { sut, mockedAxios } = makeSut()
    mockedAxios.post.mockResolvedValueOnce(mockHttpResponse())
    await sut.post(params)

    expect(mockedAxios.post).toHaveBeenCalledWith(
      params.url,
      params.body
    )
  })
})
