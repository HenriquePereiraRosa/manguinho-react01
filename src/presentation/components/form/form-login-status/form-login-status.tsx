import React from 'react'
import Styles from './form-login-status-styles.scss'
import CircleSpinner from '../../spinners/circle-spinner/circle-spinner'

const FormLoginStatus: React.FC = () => {
  return (
    <div className={Styles['error-container']}>
      <span className={Styles.error}>Error</span>
      <CircleSpinner className={Styles.error} />
    </div>
  )
}

export default FormLoginStatus
