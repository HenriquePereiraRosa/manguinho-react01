import { ValidationComposite } from '@/validation/validators/validation-composite/validation-composite'
import { makeLoginValidation } from './login-validation-fatory'
import { ValidationBuilder } from '@/validation/builder/validation-builder'

describe('LoginValidationFactory', () => {
  it('Should produce ValidationCompsite with correct Validators', async () => {
    const composite = makeLoginValidation()
    expect(composite).toEqual(ValidationComposite.build([
      ...ValidationBuilder.field('email').required().email().build(),
      ...ValidationBuilder.field('password').required().min(5).build()
    ]))
  })
})
