import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";



export default function Navbar() {
  let location = useLocation();
  const navigate = useNavigate();
  
useEffect(() => {
  }, [location]);

  const handleLogOut = ()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          MyBook
        </Link>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav me-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/"? "active" : ""}`} to="/" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/about"? "active" : ""}`} to="/about">
                About
              </Link>
            </li>
          </ul>
          { (!localStorage.getItem('token'))?( <form className="d-flex my-2 my-lg-0">
            <Link className="btn btn-primary my-2 mx-2" to = "/login" role="button">LogIn</Link>
            <Link className="btn btn-primary my-2" to = "/register"  role="button">Register</Link>
          </form>): <button className="btn btn-primary my-2" onClick={handleLogOut}>Logout</button>}
        </div>
      </div>
    </nav>
  );
}
