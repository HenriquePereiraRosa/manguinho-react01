import React from 'react'
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/infra/i18n/i18n'
import Main from '@/presentation/pages/main/main'
import SignUp from '@/presentation/pages/signup/signup'
import { makeLogin } from '@/main/factories/pages/login/login-factory'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <Routes>

          <Route
            path="/"
            element={<Main />}
          />

          <Route
            path="/login"
            Component={makeLogin}
          />

          <Route
            path="/signup"
            element={<SignUp />}
          />

        </Routes>
      </I18nextProvider>,
    </BrowserRouter>
  )
}

export default Router
