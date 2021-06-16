import React from 'react';
import "./Navbar.css";
import {NavLink} from 'react-router-dom';
import Logo from '../../images/logotrans.png';


const Navbar = (props) => {

    return (
      <>
        <div className="nav">

          <div className="logo">
            <NavLink to="/"><img className="img"  src={Logo}/></NavLink>
            
          </div>

         <div className="blank"></div>

         
          <div className="NavMenu">
{/*             <div className="NavLink">
              <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/contacto">Contacto</NavLink>
            </div> */}
            <div className="NavLink">
              <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/register">Inscribirse</NavLink>
            </div>
            <div className="NavLink" activeClassName="selected">
              <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/login">Login</NavLink>
            </div>
            
            
            
    
          </div>  

        </div>
      </>
    );
  };
  export default Navbar;