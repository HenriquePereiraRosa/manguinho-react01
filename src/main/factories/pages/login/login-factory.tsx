import { RemoteAuth } from '@/data/feature/auth/remote-auth'
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'
import Login from '@/presentation/pages/login/login'
import { ValidationBuilder } from '@/validation/builder/validation-builder'
import { ValidationComposite } from '@/validation/validators/validation-composite/validation-composite'
import React from 'react'

export const makeLogin: React.FC = () => {
  // const apiUrl = 'http://fordevs.herokuapp.com/api/login'
  const apiUrl = 'http://localhost:3001/api/login'
  // const apiUrl = 'https://google.com?q=disney'
  const axiosClient = new AxiosHttpClient()
  const authentication = new RemoteAuth(apiUrl, axiosClient)
  const validation = ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build()
  ])

  return (
    <Login
      authentication={authentication}
      validation={validation}
    />
  )
}
