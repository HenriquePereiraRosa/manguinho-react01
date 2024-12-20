import type axios from 'axios'
import { AxiosHttpClient } from './axios-http-client'
import { mockAxios, mockHttpResponse } from '@/infra/test'
import { mockPostRequest } from '@/main/tests'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
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
  test('Should call Axios with correct Url', async () => {
    const params = mockPostRequest()
    const { sut, mockedAxios } = makeSut()
    mockedAxios.post.mockResolvedValueOnce(mockHttpResponse())
    await sut.post(params)

    expect(mockedAxios.post).toHaveBeenCalledWith(
      params.url,
      params.body
    )
  })

  test('Should return the correct StatusCode and Body', async () => {
    const { sut, mockedAxios } = makeSut()
    const promise = sut.post(mockPostRequest())

    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  })

  test('Should return the correct StatusCode and Body on failure', async () => {
    const { sut, mockedAxios } = makeSut()
    mockedAxios.post.mockRejectedValueOnce({
      response: mockHttpResponse()
    })
    const promise = sut.post(mockPostRequest())

    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  })
})
