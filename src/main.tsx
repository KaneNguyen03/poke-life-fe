import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/auth-provider.tsx'
import GoogleOAuthProviderComponent from './context/google-oauth-provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <GoogleOAuthProviderComponent>
            <App />
          </GoogleOAuthProviderComponent>
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
