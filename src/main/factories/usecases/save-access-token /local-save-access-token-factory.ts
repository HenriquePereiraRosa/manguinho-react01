import { type ISaveAccessToken } from '@/domain/usecases/authentication/save-access-token'
import { makeLocalStorageAdapter } from '../../storage/local-storage-adapter-factory'
import { SaveAccessTokenLocal } from '@/data/usecases/save-acces-token/save-acces-token-local'

export const makeSaveAccessTokenLocal = (): ISaveAccessToken => {
  return new SaveAccessTokenLocal(makeLocalStorageAdapter())
}
