import { Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Home from "./components/Home"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => {
  return (
    <>

      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notes-keeper" element={<Home />} />
      </Routes>
    </>
  )
}

export default App