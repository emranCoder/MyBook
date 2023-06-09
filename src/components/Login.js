import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";


export default function Login(props) {
    const [credentials,setcredentials] = useState({email:"maryandales4@mail.com", 
    password: "scam999"});
    const navigate = useNavigate();

    const handleOnsubmit = async (e) => {
        e.preventDefault();
        const url = `http://localhost:5000/api/auth/login`;
        const response = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        const json = await response.json();
        console.log(json);
        if(json.success)
        {
            //Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/");
            props.showAlert("Loged in Successfully", "success");

        }else
        {
            props.showAlert("Invalid Credentials!", "danger");
        }
    }
    const handleOnchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    }




    return (
        <div>
            <form method='POST' onSubmit={handleOnsubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={handleOnchange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={handleOnchange}/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}
