import { Outlet, Navigate } from "react-router-dom";


const PrivateRoutes=()=>{
    let auth=window.sessionStorage.getItem("auth")
    
    if(auth){
        console.log(auth['token'])
        console.log("Auth"+auth)
        return (JSON.parse(auth).token ?<Outlet></Outlet> : <Navigate to="/sign-in"></Navigate>);
    }
    else{
        console.log("Entered to hear");
        return (<Navigate to="/sign-in"></Navigate>);
    }
}

export default PrivateRoutes