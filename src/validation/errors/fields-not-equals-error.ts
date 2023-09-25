import { t } from 'i18next'

export class FieldsNotEqualError extends Error {
  constructor() {
    const errorMessage = t('fields-not-equals-error')
    super(errorMessage)
    this.name = 'FieldsNotEqualError'
  }
}
