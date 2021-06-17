
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Login from './containers/Login/Login';
import Home from './containers/Home/Home';
import Profile from './containers/Profile/Profile';
import Register from './containers/Register/Register';




function App() {
  return (
    <div>
      <BrowserRouter>

        <Navbar/>

            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/login" exact component={Login}/>
              <Route path="/profile" exact component={Profile}/>
              <Route path="/register" exact component={Register}/>
                    
            </Switch>

        <Footer/>

      </BrowserRouter>

    </div>
  );
}

export default App;
