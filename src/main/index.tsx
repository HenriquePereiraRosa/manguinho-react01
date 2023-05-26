import '@/presentation/styles/global.scss'
import { createRoot } from 'react-dom/client'
import React from 'react'
import Login from './pages/login/login'

const container = document.getElementById('main')
if (container) {
  const root = createRoot(container)
  root.render(<Login />)
}
