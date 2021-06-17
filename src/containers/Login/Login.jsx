import React , {useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import "./Login.css";
import {Input, notification} from 'antd';
import {connect} from 'react-redux';
import {LOGIN} from '../../redux/types'


const Login = (props) => {

    let history = useHistory();

    //Hooks
    const [credentials, setCredentials] = useState({email:'', password:''});
    const [msgError, setMensajeError] = useState('');
    
    //Handle
    const updateCredentials = (e) => {
        setCredentials ({...credentials, [e.target.name]: e.target.value});
    }

    const logeame = async () => {

        //Primero, testeamos los datos
            
        if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(credentials.email) ) {
             setMensajeError('Introduce el formato de email valido ejemplo@ejemplo.com');
             return;
        }

        //Luego, generamos el body de datos
        let body = {
            email : credentials.email,
            password : credentials.password
        }
        
        //Axios      
        if (document.getElementById("opciones").value === "user") {

            try {var res = await axios.post('http://localhost:3005/login', body);

                // res viene de vuelta con el token y los datos
                // localStorage.setItem('token', res.data.token)
                // localStorage.setItem('dataUser', JSON.stringify(res.data.user))
                // localStorage.setItem('idUser', res.data.user._id)
                let perfil = document.getElementById("opciones").value;
                let data = {
                    token : res.data.token,
                    user : (res.data.user),
                    idUser: res.data.user._id,
                    perfil: perfil
                }


                //Guardo en RDX
                props.dispatch({type:LOGIN,payload:data});
               
                
                //Mensaje de bienvenida
                let description = ("Bienvenido " + res.data.user.name + " " + res.data.user.lastName1 + ".");
                notification.success({message:'Login correcto.',description: description});

                //Redireccion
                setTimeout(()=> {
                    if (res.data.user.isAdmin === false){
                       history.push("/profile");
                    }else {
                        history.push("/profileadmin");
                    }
            
                }, 750);
                
            } catch (err) {
                setMensajeError(JSON.stringify(err.response.data.message));
            }

        }else{

            try {var res = await axios.post('http://localhost:3005/login/monitor', body);
                console.log(res.data);
                console.log(body);
                // res viene de vuelta con el token y los datos
                // localStorage.setItem('token', res.data.token);
                // localStorage.setItem('dataUser', JSON.stringify(res.data.monitor));
                // localStorage.setItem('idUser', res.data.monitor._id);
                // localStorage.setItem('nameCoach', res.data.monitor.name);

                let data = {
                    token : res.data.token,
                    user : JSON.stringify(res.data.user),
                    idUser: res.data.user._id
                }
                //Guardo en RDX
                props.dispatch({type:LOGIN,payload:data});
                
                //Redireccion
                setTimeout(()=> {
                
                if (res.data.monitor.isAdmin === false){
                        history.push("/profilemonitor");
                    }else {
                        history.push("/profileadmin");
                    }
            
                }, 750);
                
            } catch (err) {
                console.log(err)
                if (err.response?.data?.message == "Cannot read property 'password' of null"){
                    setMensajeError(JSON.stringify("El password o el email son incorrectos."));
                }else {
                    setMensajeError(JSON.stringify(err.response?.data?.message));
                }

            }
        }

 
    }
    return (

        <div>
           

        <div className = "vistaLogin">

            <div className = "loginCard"> 
                <div className = "cardLogin">
                    <input className="input" type="email" name="email" placeholder="email" onChange={updateCredentials} size="40" lenght='30'></input>
                </div>
                <div className = "cardLogin">
                    <input className="input" type="password" name="password" placeholder="password" onChange={updateCredentials} size="40" lenght='30'></input>
                    
                </div>
                <div className = "cardLogin">
                    <select id = "opciones" className="input">
                        <option value="user">Cliente</option>
                        <option value="monitor">Entrenador</option>
                    </select>
                </div>
                <div className = "sendButton" onClick={()=>logeame()}>Login</div>
                <div>{msgError}</div>
            </div>

        </div>

        
        </div>
    )
}

export default connect()(Login);