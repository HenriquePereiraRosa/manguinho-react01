import React from 'react'
import Styles from './login-styles.scss'
import {
  Footer,
  FormLoginStatus,
  HeaderLogin,
  Input
} from '@/presentation/components'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <HeaderLogin />
      <form className={Styles.form}>
        <h2>Login</h2>

        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />

        <button className={Styles['button-submit']}
          type="submit">Entrar</button>
        <span className={Styles.link}>Criar conta</span>

        <FormLoginStatus />

      </form>

      <Footer />
    </div>
  )
}

export default Login
