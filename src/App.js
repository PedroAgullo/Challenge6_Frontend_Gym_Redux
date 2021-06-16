
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Login from './containers/Login/Login';
import Home from './containers/Home/Home';




function App() {
  return (
    <div>
      <BrowserRouter>

        <Navbar/>

            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/login" exact component={Login}/>
      
            </Switch>

        <Footer/>

      </BrowserRouter>

    </div>
  );
}

export default App;
