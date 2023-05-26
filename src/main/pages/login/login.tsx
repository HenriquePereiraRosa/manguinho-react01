import React from 'react'
import Styles from './login-styles.scss'
import FaCircleCheck from '@/presentation/components/icons/fa-circle-check'
import CircleSpinner from '@/presentation/components/spinners/circle-spinner/circle-spinner'
import HeaderLogin from '@/presentation/components/header/header-login/header-login'
import Footer from '@/presentation/components/footer/footer'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <HeaderLogin />
      <form className={Styles.form}>
        <h2>Login</h2>

        <div className={Styles['button-component']}>
          <input type="email" name="email" placeholder="Digite seu e-mail" />
          <span className={Styles['button-status']}><FaCircleCheck width="1.5rem" /></span>
        </div>

        <div className={Styles['button-component']}>
          <input type="password" name="password" placeholder="Digite sua senha" />
          <span className={Styles['button-status']}><FaCircleCheck width="1.5rem" /></span>
        </div>

        <button className={Styles['button-submit']}
          type="submit">Entrar</button>
        <span className={Styles.link}>Criar conta</span>

        <div className={Styles['error-container']}>
          <span className={Styles.error}>Error</span>
          <CircleSpinner className={Styles.error} />
        </div>

      </form>

      <Footer />
    </div>
  )
}

export default Login
