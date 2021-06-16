import React from 'react';
import "./Navbar.css";
import { NavLink } from 'react-router-dom';
import Logo from '../../images/logofinalnuevogrisSmall.png';
import { connect } from 'react-redux';
import { LOGOUT, LOGOUTROOM } from '../../redux/types';
import { useHistory } from 'react-router-dom';

const Navbar = (props) => {


  let history = useHistory();


  const takeMe = (where) => {
    history.push(where);
  }

  const logOut = () => {
    props.dispatch({ type: LOGOUT });
    props.dispatch({ type: LOGOUTROOM });

    setTimeout(() => {
      history.push('/');
    }, 500)

  }

  if (props.credentials?.token == '') {
    return (
      <div className="nav">
        <div className="logo">
          <NavLink to="/"><img className="img" src={Logo} /></NavLink>
        </div>

        <div className="blank"></div>

        <div className="NavMenu" >
          <div className="NavLink">
            <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/register">Inscribirse</NavLink>
          </div>
          <div className="NavLink" activeClassName="selected">
          <NavLink style={{ color: 'inherit', textDecoration: 'inherit' }} to="/login">Login</NavLink>
          </div>
        </div>
      </div>
    )

  } else {
    return (
      <div className="nav">
        <div className="logo">
          <NavLink to="/"><img className="img" src={Logo} /></NavLink>
        </div>
        <div className="blank"></div>
        <div className="NavMenu">
          <div className="NavLink">
            <div className="NavLink">
              <NavLink style={{ color: 'inherit', textDecoration: 'inherit' }} onClick={()=>logOut()} to="/">Logout</NavLink>
            </div>
            <div className="NavLink" activeClassName="selected">
              <NavLink style={{ color: 'inherit', textDecoration: 'inherit' }} to="/profile">Profile</NavLink>
            </div>
            <div className="NavLink" activeClassName="selected">
              <NavLink style={{ color: 'inherit', textDecoration: 'inherit' }} to="/Useroom">Clases</NavLink>
            </div>
          </div>
        </div>
      </div>
        )
}


};


export default connect((state)=>({credentials:state.credentials}))(Navbar);


