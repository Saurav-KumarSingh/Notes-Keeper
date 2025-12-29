import { Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Home from "./components/Home"

const App = () => {
  return (
    <>
    
    <Routes>
      <Route path="/" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/notes-keeper" element={<Home/>} />
    </Routes>
    </>
  )
}

export default App