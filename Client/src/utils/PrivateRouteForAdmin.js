import { Outlet, Navigate } from "react-router-dom";


const PrivateRoutesForAdmin=()=>{
    let auth=window.sessionStorage.getItem("admin-auth")
    console.log("auth->"+auth)
    if(auth){
        console.log(auth['token'])
        console.log("admin-auth"+auth)
        return (JSON.parse(auth).token ?<Outlet></Outlet> : <Navigate to="/admin-log-in"></Navigate>);
    }
    else{
        console.log("Entered to hear");
        return (<Navigate to="/admin-log-in"></Navigate>);
    }
}

export default PrivateRoutesForAdmin