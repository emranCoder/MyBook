import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";



const Register = (props) => {
  const [credentials,setcredentials] = useState({name:"",email:"", password: "", cpassword: ""});
  const navigate = useNavigate();


  const handleOnsubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:5000/api/auth/createuser`;

   const  { name, email, password, cpassword} = credentials;
    const response = await fetch(url, {
      
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name, email, password}),
    });

    const json = await response.json();
    console.log(json);
    if(json.success)
    {
        //Save the auth token and redirect
        localStorage.setItem('token', json.authtoken);
        navigate("/");
        props.showAlert("Welcome! To our World.", "success");

    }else
    {
      props.showAlert("Invalid Credentials!", "danger");
    }
}


const handleOnchnage= (e)=>{
  setcredentials({ ...credentials, [e.target.name]: e.target.value });
}

  return (
    <div>
      <form onSubmit={handleOnsubmit} method='POST'>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={handleOnchnage}  />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp"  onChange={handleOnchnage} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password'  onChange={handleOnchnage} required minLength={5}/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Conform Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword'  onChange={handleOnchnage} required  minLength={5}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Register;
