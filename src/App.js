import { useEffect } from 'react';
import './App.css';
import { connectWithWebSocket } from './utils/wssConnection/wssConnection';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom'
import Dashboard from './Dashboard/Dashboard';
import LoginPage from './LoginPage/LoginPage';
import LoginPageNew from './authPages/LoginPage/LoginPageNew';
import RegisterPage from './authPages/RegisterPage/RegisterPage';
import ForgotPassworkPage from './authPages/ForgotPassword/ForgotPassword';
import axios from 'axios';
import { service } from './utils/service/api';

function App() {
  const history = useHistory();

  useEffect(() => {
    connectWithWebSocket();
  }, []);

  useEffect(() => {
    const getCookie = document.cookie
    console.log(getCookie?.length, 'getCookie')
    axios.get(
      service.loginapi,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          const checkAuth = response.data
          const getCookie = document.cookie?.replace("token", '')
        }
      });
  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path="/change-password">
          <ForgotPassworkPage />
        </Route>
        <Route exact path="/forgot-password">
          <ForgotPassworkPage />
        </Route>
        <Route exact path="/login">
          <LoginPageNew />
        </Route>
        <Route exact path="/register">
            <RegisterPage />
          </Route>
        <Route path='/dashboard'>
          <Dashboard />
        </Route>
        <Route path='/'>
          <LoginPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
