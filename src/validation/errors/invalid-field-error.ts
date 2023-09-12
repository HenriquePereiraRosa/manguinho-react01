import { t } from 'i18next'

export class InvalidFieldError extends Error {
  constructor () {
    const errorMessage = t('error-msg-mandatory-field')
    super(errorMessage)
  }
}
