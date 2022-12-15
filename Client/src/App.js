import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import AdminLogIn from './components/AdminLogIn'
import UserPage from "./components/UserPage"
import PrivateRoutes from "./utils/PrivateRoutes"
import AdminPage from './components/adminComponents/AdminPage';
import LocationPage from './components/LocationComponents';
import {useEffect} from "react";

import PrivateRoutesForAdmin from './utils/PrivateRouteForAdmin';
function App() {
  useEffect(() => {
    document.title = 'Social Map of Events';
  }, []);
  return (

    <Router>
    <div className='App'>
      <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route path='/' element={<LoginComponent/>}/>
              <Route path='/sign-in' element={<LoginComponent/>}/>
              <Route path='/sign-up' element={<RegisterComponent/>}/>
              <Route path='/admin-log-in' element={<AdminLogIn/>}/>
              <Route element={<PrivateRoutesForAdmin></PrivateRoutesForAdmin>}>
                  <Route path='/admin-page/*' element={<AdminPage></AdminPage>}></Route>
              </Route>
              <Route element={<PrivateRoutes />}>
                  <Route path="/user-page"  element={<UserPage/>}/>
                  <Route path="/location-page" element={<LocationPage/>}/>
              </Route>
            </Routes>
          </div>
      </div>
    </div>
    </Router>

  );
}

export default App;
