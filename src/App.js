import { useEffect } from 'react';
import './App.css';
import { connectWithWebSocket } from './utils/wssConnection/wssConnection';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import Dashboard from './Dashboard/Dashboard';
import LoginPage from './LoginPage/LoginPage';
import LoginPageNew from './authPages/LoginPage/LoginPageNew';
import RegisterPage from './authPages/RegisterPage/RegisterPage';

function App() {

  useEffect(() => {
    connectWithWebSocket();
  }, []);

  return (
    <Router>
      <Switch>
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
