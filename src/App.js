import { useEffect } from 'react';
import './App.css';
import { connectWithWebSocket } from './utils/wssConnection/wssConnection';

function App() {

 useEffect(() => {
  connectWithWebSocket();
 }, []);

  return (
    <div className="App">
     Hello setup intividual
    </div>
  );
}

export default App;
