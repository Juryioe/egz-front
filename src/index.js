import { ThemeProvider } from '@emotion/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { theme } from '../src/theme'
import App from './App'
import AuthCtxProvider from './store/AuthCtxProvider'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <AuthCtxProvider>
        <App />
      </AuthCtxProvider>
    </BrowserRouter>
  </ThemeProvider>
)
