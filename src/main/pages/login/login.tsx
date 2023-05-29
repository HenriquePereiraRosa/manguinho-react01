import React from 'react'
import Styles from './login-styles.scss'
import HeaderLogin from '@/presentation/components/headers/header-login/header-login'
import Footer from '@/presentation/components/footer/footer'
import Input from '@/presentation/components/inputs/input/input'
import FormLoginStatus from '@/presentation/components/form/form-login-status/form-login-status'

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
