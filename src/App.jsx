import { Header, Footer } from './components'
import './App.css'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/AuthSlice'

function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser().then(
      (userData) => {
        if (userData) {
          dispatch(login({ userData }))
        }
        else {
          dispatch(logout())
        }
      }
    )
      .finally(() => setLoading(false))
  }, [])


  return !loading ?
    (
      <>
        <Header />
        <main>
          {/* Outlet here */}
        </main>
        <Footer />
      </>
    ) :

    (
      <>
        <h1>Loading...</h1>
      </>
    )
}

export default App
