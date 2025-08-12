import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n' // Import i18n configuration
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/auth-provider.tsx'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <App />
          <ToastContainer />
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
