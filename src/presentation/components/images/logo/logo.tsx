import React from 'react'
import Styles from './logo-styles.scss'

const Logo: React.FC = () => {
  return (
    <img className={Styles.img} src="/public/images/henq.ico" />
  )
}

export default Logo
