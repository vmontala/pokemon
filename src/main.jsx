import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@/index.css'

import Layout from '@/layout/Layout.jsx'
import Router from '@/Router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Layout>
      <Router />
    </Layout>
  </StrictMode>
)
