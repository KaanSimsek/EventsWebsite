import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import AdminLogIn from './components/AdminLogIn'
import UserPage from "./components/UserPage"
import PrivateRoutes from "./utils/PrivateRoutes"
import AdminPage from './components/adminComponents/AdminPage';
import PrivateRoutesForAdmin from './utils/PrivateRouteForAdmin';
function App() {
  return (

    <Router>
    <div className='App'>
      <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route path='/' element={<LoginComponent></LoginComponent>}></Route>
              <Route path='/sign-in' element={<LoginComponent></LoginComponent>}></Route>
              <Route path='/sign-up' element={<RegisterComponent></RegisterComponent>}></Route>
              <Route path='/admin-log-in' element={<AdminLogIn></AdminLogIn>}></Route>
              <Route element={<PrivateRoutesForAdmin></PrivateRoutesForAdmin>}>
                  <Route path='/admin-page/*' element={<AdminPage></AdminPage>}></Route>
              </Route>
              <Route element={<PrivateRoutes></PrivateRoutes>}>
                  <Route path="/user-page"  element={<UserPage></UserPage>}></Route>
              </Route>
            </Routes>
          </div>
      </div>
    </div>
    </Router>

  );
}

export default App;
