import { ValidationComposite } from '@/validation/validators/validation-composite/validation-composite'
import { makeSignUpValidation } from './signup-validation-fatory'
import { ValidationBuilder } from '@/validation/builder/validation-builder'

describe('LoginValidationFactory', () => {
  it('Should produce ValidationComposite with correct Validators', async () => {
    const composite = makeSignUpValidation()
    expect(composite).toEqual(ValidationComposite.build([
      ...ValidationBuilder.field('name').required().name().min(3).max(100).build(),
      ...ValidationBuilder.field('email').required().email().build(),
      ...ValidationBuilder.field('password').required().min(5).build(),
      ...ValidationBuilder.field('password-confirmation').required().sameAs('password').build()
    ]))
  })
})
