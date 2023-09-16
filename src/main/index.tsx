import { Router } from '@/presentation/components'
import '@/presentation/styles/global.scss'
import React from 'react'
import { createRoot } from 'react-dom/client'

const container = document.getElementById('main')
if (container) {
  const root = createRoot(container)
  root.render(
    <Router />
  )
}
