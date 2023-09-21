import { type SetStorage } from '@/data/protocols/storage/set-storage'
import { LocalStorageAdapter } from '@/infra/storage/local-storage-adapter'

export const makeLocalStorageAdapter = (): SetStorage => {
  return new LocalStorageAdapter()
}
