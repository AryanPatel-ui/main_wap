import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import SignIn from './auth.jsx'
import ClientDashboard from './client.jsx'
import FreelancerDashboard from './freelancer.jsx'

export function App() {
  const [session, setSession] = useState(null)

  if (session?.role === 'freelancer') {
    return <FreelancerDashboard name={session.name} onSignOut={() => setSession(null)} />
  }

  if (session?.role === 'client') {
    return <ClientDashboard name={session.name} onSignOut={() => setSession(null)} />
  }

  return <SignIn onSignIn={setSession} />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
