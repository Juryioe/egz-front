import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './PrivateRoute/PrivateRoute'
import Add from './components/Add/Add'
import Navbar from './components/NavBar/Navbar'
import CreateItem from './pages/CreateItem'
import Feed from './pages/Feed'
import HomePage from './pages/HomePage'
import LoginPage from './pages/Login'
import RegisterPage from './pages/RegisterPage'

function App() {
  const [mode, setMode] = useState(() => {
    const storedMode = localStorage.getItem('mode')
    return storedMode ? storedMode : 'light'
  })

  useEffect(() => {
    localStorage.setItem('mode', mode)
  }, [mode])

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <Toaster />
      <CssBaseline />
      <Box bgcolor="background.default" color="text.primary">
        <Navbar setMode={setMode} mode={mode} />
        <Container>
          <Routes>
            <Route
              path="/create"
              element={
                <PrivateRoute>
                  <CreateItem />
                </PrivateRoute>
              }
            />

            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/advertisements" element={<Feed />} />
          </Routes>
        </Container>
        <Add />
      </Box>
    </ThemeProvider>
  )
}

export default App
