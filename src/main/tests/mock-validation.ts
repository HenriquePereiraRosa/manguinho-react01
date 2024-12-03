import { type IValidation } from '@/data/protocols/validation/validation'

export class ValidationStub implements IValidation {
  errorMessage: string
  field: string
  value: string

  validate (field: string, value: string): string {
    this.field = field
    this.value = value
    return this.errorMessage
  }
}
