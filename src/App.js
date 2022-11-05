import axios from 'axios';
import './App.css';
import Home from './screens/HomePage'
import { useEffect } from 'react';


const App = () => {
  useEffect(() => {

    const getData = async () => {
      const response = await axios.get('http://localhost:3100/data')

      console.log(response)
      // return response;
    }

    getData();

  }, [])

  return (
    <div className="App">
      <Home></Home>
    </div>
  );
}

export default App;
