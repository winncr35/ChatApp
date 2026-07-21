import { BrowserRouter, Routes, Route } from "react-router"
import Login from "./pages/login.tsx"
import SignUp from "./pages/signup.tsx"
import ChatApp from "./pages/chatapp.tsx"
import { Toaster } from "sonner"
function App() {

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


          <Route path='/'
            element={<ChatApp />}
          />
          \
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
