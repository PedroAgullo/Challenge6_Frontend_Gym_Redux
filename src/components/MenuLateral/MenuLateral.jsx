import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import './MenuLateral.css';
import { connect } from 'react-redux';
import axios from 'axios';
import {GETROOMUSER, CLASES, PROFILE, JOIN, JOINMONITOR, GETROOMMONITOR, NEWROOM, PAYMENT} from '../../redux/types';
import { NavLink } from 'react-router-dom';

const Menulateral = (props) => {

    console.log('PROBANDO EL MENU LATERAL');


    let history = useHistory();
    let credentials = props.credentials;
    const [useroom, setUseroom] = useState([]);


    const cambiaDatos = async (info) => {

        switch(info) {

            case 'profile':
                props.dispatch({type:PROFILE,payload: info});

            break;

            case 'useroom':

                    props.dispatch({type:CLASES,payload: info});

            break;          

            case 'joinuser':
                    // let res = await axios.get('http://localhost:3005/room/active');
                    // props.dispatch({type:GETROOMUSER,payload: res.data});
                    props.dispatch({type:JOIN,payload: info});

            break;

            case 'monitoroom':

                    props.dispatch({type:JOIN,payload: info});

            break;

            case 'joinmonitor':
                // let resul = await axios.get('http://localhost:3005/room/active');
                // props.dispatch({type:GETROOMMONITOR,payload: resul.data});
                props.dispatch({type:JOINMONITOR,payload: info});

             break;

             case 'newroom':

                props.dispatch({type:NEWROOM,payload: info});

             break;


            case 'payment':

                props.dispatch({type:PAYMENT,payload: info});

            break;
            default:

            break;
            
        }
          
    } 

    //IFS PARA MOSTRAR UN MENU SEGUN EL TIPO DE USUARIO QUE ACCEDE A LA APLICACIÓN
    if (props.credentials.user.isAdmin === false && props.credentials.perfil === 'user'){
        return (
        <div className="boxLateral">
                
                <div className="lateralMenu">
                    <div className="botomMenuLateral" onClick={()=>cambiaDatos('profile')}>Perfil</div>
                    <div className="botomMenuLateral" onClick={()=>cambiaDatos('useroom')}>Mis clases</div>
                    <div className="botomMenuLateral" onClick={()=>cambiaDatos("joinuser")}>Reservar</div>
                    <div className="botomMenuLateral">Taquilla</div>
                    <div className="botomMenuLateral" onClick={()=>cambiaDatos("payment")}>Suscripción</div>
                    <div className="botomMenuLateral" onClick={()=>history.push('/codeqr')}>Acceso GYM</div>
                </div>
            </div>
        )
    }else if (props.credentials.user.isAdmin === false && props.credentials.perfil === 'monitor'){
        return (    
        
            <div className="boxLateral">
                
                <div className="lateralMenu">
                    <div className="botomMenuLateral" onClick={()=>cambiaDatos('profile')}>Perfil</div>
                    <div className="botomMenuLateral" onClick={()=>cambiaDatos('monitoroom')}>Mis clases</div>
                    <div className="botomMenuLateral" onClick={()=>cambiaDatos("joinmonitor")}>Reservar</div>
                    <div className="botomMenuLateral">Taquilla</div>
                    <div className="botomMenuLateral" onClick={()=>cambiaDatos("newroom")}>Nueva sala</div>
                    <div className="botomMenuLateral" onClick={()=>history.push('/codeqr')}>Acceso GYM</div>
                </div>
            </div>
        )
    }else {
        return (
            <div className="boxLateral">
                    
                    <div className="lateralMenu">
                        <div className="botomMenuLateral" onClick={()=>cambiaDatos('profile')}>ADMIN</div>
                        <div className="botomMenuLateral" onClick={()=>cambiaDatos('useroom')}>Mis clases</div>
                        <div className="botomMenuLateral" onClick={()=>cambiaDatos("joinuser")}>Reservar</div>
                        <div className="botomMenuLateral" onClick={()=>cambiaDatos("newroom")}>Nueva sala</div>
                        <div className="botomMenuLateral" onClick={()=>cambiaDatos("payment")}>Suscripción</div>
                        <div className="botomMenuLateral" onClick={()=>history.push('/codeqr')}>Acceso GYM</div>
                    </div>    
                </div>
            )

    }
}

export default connect((state) => ({
    credentials:state.credentials,
    tipodatos: state.tipodatos
    }))(Menulateral);