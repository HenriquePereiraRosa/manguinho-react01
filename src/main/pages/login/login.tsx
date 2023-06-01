import React, { useState } from 'react'
import Styles from './login-styles.scss'
import {
  Footer,
  FormLoginStatus,
  HeaderLogin,
  Input
} from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'
import { type StateProps } from '@/presentation/contexts/form-context/form-context'

const Login: React.FC = () => {
  const [formState] = useState<StateProps>({
    isLoading: false,
    errorMessage: ''
  })

  return (
    <div className={Styles.login}>
      <HeaderLogin />

      <FormContext.Provider value={formState} >
        <form className={Styles.form}>
          <h2>Login</h2>

          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />

          <button
            className={Styles['button-submit']}
            type="submit"
            disabled>Entrar</button>

          <span className={Styles.link}>Criar conta</span>

          <FormLoginStatus />

        </form>
      </FormContext.Provider>

      <Footer />
    </div>
  )
}

export default Login
