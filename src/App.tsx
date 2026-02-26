import { RouterProvider } from 'react-router'
import './index.css'
import { router } from './app/router/Router'
import { SnackbarProvider } from 'notistack'
import { AuthContextProvider } from './shared/context/AuthContext'

function App() {

  return (
    <>
      <AuthContextProvider>
        <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </AuthContextProvider>
    </>
  )
}

export default App
