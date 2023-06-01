import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import NotesState from "./context/notes/NotesState";
import Alert from "./components/Alert";

function App() {
  return (
    <>
      <NotesState>
        <BrowserRouter>
          <Navbar />
          <Alert message="This is Devolped By EmranCoder" />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </BrowserRouter>
      </NotesState>
    </>
  );
}

export default App;
