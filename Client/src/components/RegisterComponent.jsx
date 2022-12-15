import React from 'react'
import {useState, useEffect,useRef } from 'react'
function RegisterComponent() {
    const [name,setName] = useState("")
    const [username, setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit=(e)=>{
      e.preventDefault();
        fetch("http://localhost:4000/register", {
            method: "POST",
            crossDomain: true,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
              name,
              username,
              email,
              password,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data, "userRegister");
              if (data.status === "ok") {
                alert("login successful");
                window.location.href = "./sign-in";
              }
              else if(data.status==="User Exists"){
                alert("user exist");
              }
              else if(data.status==="invalid-password"){
                alert("Invalid password");
              }
              else if(data.status==="non-unique-password"){
                alert("non-unique-password");
              }
            });

    }

    return (
        <form onSubmit={handleSubmit}>
          <h3>Sign Up</h3>
  
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
  
          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
  
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
  
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
  
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <a href="/sign-in">sign in?</a>
          </p>
        </form>
      );
}

export default RegisterComponent