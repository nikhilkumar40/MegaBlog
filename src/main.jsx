import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Provider store={store}>
      <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
   
  </StrictMode >
)
