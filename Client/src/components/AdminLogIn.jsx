import React from 'react'
import {useState, useEffect,useRef } from 'react'
function AdminLogIn() {
    
    
    const [username,setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit=(e)=>{
      e.preventDefault();
        fetch("./api/login-admin", {
            method: "POST",
            crossDomain: true,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                username,
                password,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data, "adminRegister");
              if (data.status === "ok") {
                  alert("login successful");
                  window.sessionStorage.setItem("token", data.data);
                  window.sessionStorage.setItem("admin-auth",JSON.stringify({"token":true}));
                  window.location.href = "./admin-page";
              }
              else{
                alert("Unsuccesfull");
              }
            });
    }

    return ( 
        <form onSubmit={handleSubmit}>
            <h3>Admin Sign In</h3>
            <div className="mb-3">
              <label>Username</label>
              <input
                type="username"
                className="form-control"
                placeholder="Enter username"
                onChange={(e) => setUsername(e.target.value )}
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
            <div className="mb-3">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="forgot-password text-right">
              <a href="/sign-in">Sign in as user</a>
            </p>
        </form>
      )
}

export default AdminLogIn
