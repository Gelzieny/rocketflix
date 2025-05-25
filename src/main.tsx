import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import { App } from './App'
import { ThemeProvider } from './components/context'
import { BackgroundTheme } from './components/background_theme'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider> 
      <BackgroundTheme />
      <App />
    </ThemeProvider> 
  </StrictMode>,
)
