export interface IFieldValidation {
  field: string
  validate: (value: string | string[]) => Error | null
}
