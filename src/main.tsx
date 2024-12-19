import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css"

import { Provider } from './components/ui/provider.tsx'
import { RouterProvider } from 'react-router-dom'
import router from './Pages/routes.tsx'








createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>

      
      <RouterProvider router={router}>

      </RouterProvider>
    </Provider>
 

  </StrictMode>,
)
