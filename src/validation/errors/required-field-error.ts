import { t } from 'i18next'

export class RequiredFieldError extends Error {
  constructor() {
    const errorMessage = t('error-msg-mandatory-field')
    super(errorMessage)
    this.name = 'RequiredFieldError'
  }
}
