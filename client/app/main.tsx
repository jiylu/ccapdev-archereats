import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/auth-context.tsx'
import { RestaurantProvider } from './context/restaurant-context.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RestaurantProvider>
          <App />
        </RestaurantProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
