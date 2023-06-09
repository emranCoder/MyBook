import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import NotesState from "./context/notes/NotesState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Register from "./components/Register";
import { useState } from "react";

function App() {


  const[alert,setAlert] = useState(null);

  const showAlert=(message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null);
    },2000);
  }

  return (
    <>
      <NotesState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert} />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login showAlert={showAlert}/>} />
              <Route path="/register" element={<Register showAlert={showAlert}/>} />
            </Routes>
          </div>
        </BrowserRouter>
      </NotesState>
    </>
  );
}

export default App;
