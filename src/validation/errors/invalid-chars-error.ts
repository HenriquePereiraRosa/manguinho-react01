import { t } from 'i18next'

export class InvalidCharsError extends Error {
  constructor () {
    const errorMessage = t('error-msg-chars-invalid')
    super(errorMessage)
  }
}
