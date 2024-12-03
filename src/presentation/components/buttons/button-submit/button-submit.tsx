import React from 'react'
import Styles from './button-submit-styles.scss'
import { type ButtonProps } from '@/domain/props/ButtonProps'
import { t } from 'i18next'

const ButtonSubmit: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <button
      data-testid="btn-submit"
      className={Styles['button-submit']}
      type="submit"
      disabled={!props.disabled}
      onClick={props.onClick} >
      {t('enter')}
    </button>
  )
}

export default ButtonSubmit
