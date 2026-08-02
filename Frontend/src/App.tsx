import { BrowserRouter, Routes, Route } from "react-router"
import Login from "./pages/login.tsx"
import SignUp from "./pages/signup.tsx"
import ChatApp from "./pages/chatapp.tsx"
import { Toaster } from "sonner"
import ProtectedRoute from "@/components/auth/ProtectedRoute.tsx"
import { useThemeStore } from "./stores/useThemeStore.tsx"
import { useEffect } from "react"
function App() {
  const { isDark, setTheme } = useThemeStore();
  useEffect(
    () => {
      setTheme(isDark);
    }, [isDark, setTheme]);


  return (
    <>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path='/signin'
            element={<Login />}
          />

          <Route path='/signup'
            element={<SignUp />}
          />
          {/* Protected routes */}

          <Route element={<ProtectedRoute />}>

            <Route path='/'
              element={<ChatApp />}
            />
          </Route>

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
