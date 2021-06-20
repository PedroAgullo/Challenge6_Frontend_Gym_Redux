import React from 'react';
import "./Footer.css";
import {NavLink} from 'react-router-dom';
import SocialLogo1 from '../../images/logofacebook.png';
import SocialLogo2 from '../../images/logoinstagram.png';



const Footer = (props) => {

    return (

        <div className="footer">

            <div className="NavMenuFooterLeft">
                <div className="NavLinkFooterLeft">
                <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/contacto">Contacto</NavLink>
                </div>

                <div className="NavLinkFooterLeft" activeClassName="selected">
                <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/about">Sobre Nosotros</NavLink>
                </div>
            
            </div>
            
              <div className="NavMenuFooterCenter">
                <div className="NavLinkFooterCenter">
                  <div>SUCURSAL CAMPANAR - VALENCIA</div>
                </div>
                <div className="NavLinkFooterCenter">
                  <div>SUCURSAL CAUDETE - ALBACETE</div>
                </div>
              </div>
          
            <div className="NavMenuFooter">
              <div className="blanco"></div>
                <div className="NavLinkFooter">
                    <img className="LogoFooter"  src={SocialLogo1}/>
                    <img className="LogoFooter"  src={SocialLogo2}/>
                </div>
            </div>
          </div>  
        

    );
  };
  export default Footer;