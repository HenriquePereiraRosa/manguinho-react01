import React from 'react'
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'
import Login from '@/main/pages/login/login'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/infra/i18n/i18n'
import { ValidationStub } from '@/domain/test/mock-validation'
import { AuthenticationSpy } from '@/domain/test/mock-auth'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <Routes>

          {/* todo: REMOVE Spys and Stubs */}
          <Route
            path="/login"
            element={<Login
              validation={new ValidationStub()}
              authentication={new AuthenticationSpy()} />} />

          <Route
            path="/signup"
            element={<div style={{ color: '#fafafa' }}>SIGNUP (TODO)</div>}
          />

        </Routes>
      </I18nextProvider>,
    </BrowserRouter>
  )
}

export default Router
