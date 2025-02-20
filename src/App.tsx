import { BrowserRouter , Route,  Routes } from "react-router"
import LoginPage from "./pages/login/login"
import AdminPage from "./pages/admin/adminPage"

function App() {


  return (
    <div>  
        <Routes>
          <Route path = "/login" element = {<LoginPage />} />
          <Route path = "/admin" element = {<AdminPage />} />
        </Routes>
    </div>
  )
}
export default App
