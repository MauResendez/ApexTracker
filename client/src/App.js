import './App.css';
import { Router } from 'react-router-dom';

import Header from './components/Header';
import Search from './components/Search';

function App() 
{
  return (
    <div className="App">
      <div className="container">
        <Header/>
        <Search/>
      </div>
    </div>
  );
}

export default App;
