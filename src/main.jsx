import { createRoot } from 'react-dom/client'

import 'reset-css'
import '@fontsource/pixelify-sans/400.css'

import '@/index.css'

import Layout from '@/layout/Layout.jsx'
import Router from '@/Router.jsx'

createRoot(document.getElementById('root')).render(
  <Layout>
    <Router />
  </Layout>
)
