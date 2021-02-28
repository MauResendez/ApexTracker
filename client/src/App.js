import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/Header';
import Search from './components/Search';
import Profile from './components/Profile';

function App() 
{
  return (
    <div className="App">
      <div className="container">
        <Router>
          <Header/>
          <Route exact path="/" component={Search}/>
          <Route exact path="/profile/:platform/:username" component={Profile}/>
        </Router>
      </div>
    </div>
  );
}

export default App;
