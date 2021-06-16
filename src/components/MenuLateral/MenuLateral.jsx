import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import './MenuLateral.css';
import { connect } from 'react-redux';
import axios from 'axios';
import {GETROOMUSER, CLASES, PROFILE} from '../../redux/types';
import { NavLink } from 'react-router-dom';

const Menulateral = (props) => {

    console.log('PROBANDO EL MENU LATERAL');


    let history = useHistory();
    let credentials = props.credentials;
    const [useroom, setUseroom] = useState([]);


    const cambiaDatos = async (info) => {

        switch(info) {

            case 'profile':
                console.log("Hemos entrado en el case de perfil en lateralmenu");
                props.dispatch({type:PROFILE,payload: info});

                history.push(info);
                
            break;

            case 'useroom':
                console.log("Hemos entrado en el case de clases del usuario en lateralmenu.");
                try{
               
                    let token = props.credentials?.token;
                    let idUser = props.credentials?.idUser;
              
                    console.log(token,"<<<=== Token del usuario en redux");
                    console.log(idUser, "<<<<<==== idUsuario de Redux");
                    let body = {
                      id : idUser
                    }
              
                    // GET rooom del usuario                    
                    let res = await axios.post('http://localhost:3005/room/userid',body,{headers:{'authorization':'Bearer ' + token}});
                    console.log("Datos devueltos de axios",res.data);
              
                    props.dispatch({type:GETROOMUSER,payload: res.data});
                    props.dispatch({type:CLASES,payload: info});

      
                  }catch (err){

                  }

            break;

            

            case 'joinuser':
                    let res = await axios.get('http://localhost:3005/room/active');
                    props.dispatch({type:GETROOMUSER,payload: res.data});
                    props.dispatch({type:CLASES,payload: info});

            break;
        }

            
          
    } 

    return (
        <div className="boxLateral">
                
                <div className="lateralMenu">
                    <div className="botomMenuLateral" onClick={()=>cambiaDatos('profile')}>Perfil</div>
                    {/* className="perfil" */}
                    <div className="botomMenuLateral" onClick={()=>cambiaDatos('useroom')}>Mis clases</div>
                    {/* <NavLink style={{ color: 'inherit', textDecoration: 'inherit' }} to="/useroom">Clases</NavLink> */}
                    {/* className="misclases" */}
                    <div className="botomMenuLateral" onClick={()=>cambiaDatos("joinuser")}>Reservar</div>
                    {/* className="reserva" */}
                    <div className="botomMenuLateral">Taquilla</div>
                    {/* className="pertaquillafil" */}
                    <div className="botomMenuLateral">Suscripción</div>
                    {/* className="suscripcion" */}
                    <div className="botomMenuLateral" onClick={()=>history.push('/codeqr')}>Acceso GYM</div>
                    {/* className="codigo" */}
                </div>

            </div>
    )
}

export default connect((state) => ({
    credentials:state.credentials,
    tipodatos: state.tipodatos
    }))(Menulateral);