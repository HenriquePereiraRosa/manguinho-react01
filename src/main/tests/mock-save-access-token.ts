import { type ISaveAccessToken } from '../../domain/usecases/save-access-token'

export class SaveAccessTokenMock implements ISaveAccessToken {
  accessToken: string
  callsCount: number = 0

  async save(accessToken: string): Promise<void> {
    this.callsCount++
    this.accessToken = accessToken
  }
}
