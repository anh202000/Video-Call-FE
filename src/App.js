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
import LoginPage from './HomePage/HomePage';
import LoginPageNew from './authPages/LoginPage/LoginPageNew';
import RegisterPage from './authPages/RegisterPage/RegisterPage';
import ForgotPassworkPage from './authPages/ForgotPassword/ForgotPassword';
import axios from 'axios';
import { service } from './utils/service/api';
import AboutPage from './About/AboutPage';
import Blog from './Blog/Blog';

function App() {
  const history = useHistory();

  useEffect(() => {
    connectWithWebSocket();
  }, []);

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
        <Route path='/blog'>
          <Blog />
        </Route>
        <Route path='/about'>
          <AboutPage />
        </Route>
        <Route path='/'>
          <LoginPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
