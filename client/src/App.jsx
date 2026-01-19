import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NotesPage from "./components/NotePage";
import CreateNotePage from "./components/CreateNotePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditForm from "./components/EditForm";

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notes-keeper" element={<NotesPage />} />
        <Route path="/notes-keeper/edit" element={<EditForm />} />
        <Route path="/notes-keeper/create" element={<CreateNotePage />} />
      </Routes>
    </>
  );
};

export default App;
