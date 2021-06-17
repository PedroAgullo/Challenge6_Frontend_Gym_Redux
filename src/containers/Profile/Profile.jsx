import React from 'react';
import './Profile.css';


import MenuLateral from '../../components/MenuLateral/MenuLateral'; 
/* import Userdata from '../../components/Userdata/Userdata'; */

import {connect} from 'react-redux';
import DataProfile from '../../components/DataProfile/DataProfile';
import DataRoom from '../../components/DataRoom/DataRoom';
import DataJoin from '../../components/DataJoin/DataJoin';



/* import Menuuser from '../Menuuser/Menuuser';
 */


const Profile = (props) => {

    // const cambiaPagina = (pagina) =>{
    //     // history.pushState('/profileuseroom');
    // }

    switch (props.tipodatos){

        case 'profile':
            console.log("Estoy en el switch case en PROFILE");
            return (
                <div>
        
                    <div className="boxPerfilUsuario">
                        <MenuLateral/>    


                    <div className="datos">
                        <DataProfile/>
                    </div>       
                    </div>     
              
        
                </div>
            );      
            break;


            case 'useroom':
                console.log("Estoy en el switch case en DEFAULT");
                return (
                    <div>
            
                        <div className="boxPerfilUsuario">
                            <MenuLateral/>

                        <div className="datos">
                            <DataRoom/>

                        </div>
                        </div>

                  
            
                    </div>
                );      
    
    
                break;

                case 'joinuser':
                    console.log("Estoy en el switch case en DEFAULT");
                    return (
                        <div>
                
                            <div className="boxPerfilUsuario">
                                <MenuLateral/>
    
                            <div className="datos">
                                <DataJoin/>
                            </div>
                            </div>
    
                      
                
                        </div>
                    );      
        
        
                    break;
    

            default:
            return (
                <div>
                    CASE  DEFAULT
                    {/* <div className="boxPerfilUsuario">
                        <MenuLateral/>    


                    <div className="datos">
                        <DataProfile/>
                    </div>       
                    </div> */}

        
                </div>
            );      
            break;            

    }



}
export default connect((state)=>({
    user:state.credentials.user,
    tipodatos: state.tipodatos
}))(Profile);