import React from 'react'
import Styles from './login-styles.scss'
import FaCircleCheck from '@/presentation/components/icons/fa-circle-check'
import CircleSpinner from '@/presentation/components/spinners/circle-spinner/circle-spinner'
import Logo from '@/presentation/components/images/logo/logo'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <header className={Styles.header}>
        <Logo />
        <h1> H8 - Clean React</h1>
      </header>
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

      <footer className={Styles.footer}></footer>
    </div>
  )
}

export default Login
