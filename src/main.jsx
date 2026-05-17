import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SignIn from './auth.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SignIn />
  </StrictMode>,
)
