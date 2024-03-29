import React, { useContext } from 'react'
import Styles from './form-login-status-styles.scss'
import CircleSpinner from '../../spinners/circle-spinner/circle-spinner'
import FormContext from '@/presentation/contexts/form-context/form-context'

const FormLoginStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext(FormContext)

  return (
    <div className={Styles['error-container']}>
      {isLoading && !errorMessage && <CircleSpinner className={Styles.error} />}
      {errorMessage && <span className={Styles.error}>{errorMessage}</span>}
    </div>
  )
}

export default FormLoginStatus
