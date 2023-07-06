import React from 'react'
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'
import Login from '@/main/pages/login/login'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/infra/i18n/i18n'
import { ValidationSpy } from '@/domain/test/mock-validation'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <Routes>

          {/* todo: REMOVE ValidationSpy */}
          <Route path="/login" element={<Login validation={new ValidationSpy()}/>} />
        </Routes>
      </I18nextProvider>,
    </BrowserRouter>
  )
}

export default Router
