
import './NewRoom.css';
import moment, { now } from 'moment';
import { connect } from 'react-redux';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import {LOGIN, UPDATE} from '../../redux/types'
import PhotoRoom1 from '../../images/zumba.png';
import PhotoRoom2 from '../../images/crossfit.png';
import PhotoRoom3 from '../../images/salsa.png';
import PhotoRoom4 from '../../images/spinning.png';
import PhotoRoom5 from '../../images/pilates.png';
import PhotoRoom6 from '../../images/boxeo.png';


const NewRoom = (props) => {


        
        //Hooks
        const [profile, setProfile] = useState([]); 
        const [datosRoom, setDatosRoom] = useState(
            {
                name : 'Zumba',
                dateStart : Date.now(),

        });        




    useEffect(() => {
        setProfile(1);
      }, []);

    let user = props.credentials.user;   

    const changeState = (info) => {        
        setProfile(info);
    }



    const updateFormulario = (e) => {
        setDatosRoom({...datosRoom, [e.target.name]: e.target.value});
        
    }


    const saveData = async (info) => {
        
        let token = props.credentials.token;
        let dateStart = moment(datosRoom.dateStart).format();
        let dateEnd = moment(dateStart).add(1, 'hours').format();
   
        console.log("probando fechas", dateEnd);


        
        let body = {            
            name: datosRoom.name,
            dateStart : dateStart,
            dateEnd : dateEnd,
        }

        let res = await axios.post('http://localhost:3005/room',body,{headers:{'authorization':'Bearer ' + token}});
        



        console.log ("RESULTADO DE AXIOS PARA DAVID", res.data);


        //Guardo en RDX
        // props.dispatch({type:UPDATE,payload:data});
        setProfile(info);

    }


    if (profile === 1) {
        return (
            <div>
                <div className="tituloPerfilUsuario"><h1>Nueva sala</h1></div>
                <div className="boxDataUser">

                    <div className="InfoNewRoom1">
                        <div className="fotoRoom1"><img id="fotoRoom1" src={PhotoRoom1} alt="Profile photo" /></div>
                        <div className="empty"><button onClick={(()=>saveData(2))}>Guardar</button></div>

                    </div>

                    <div className= "infoUser2Titulos">
                        <div className="titulosInfoUser">Nombre:</div>
                        <div className="titulosInfoUser">Fecha y hora de inicio: </div>

                        
                     
                    </div>

                    <div className="infoUser2">
                        <div className = "inputBaseuser">
                            <select id = "opciones" name="name" className="inputBaseUser" onChange={updateFormulario}>
                                <option value="Zumba">Zumba</option>
                                <option value="Salsa">Salsa</option>
                                <option value="Crossfit">Crossfit</option>
                                <option value="Pilates">Pilates</option>
                                <option value="Spinning">Spinning</option>
                                <option value="Boxeo">Boxeo</option>                                
                            </select>
                        </div>
                        
                        
     
                            <input className="inputBaseUser" type="datetime-local" name="dateStart" size="34" lenght='30' onChange={updateFormulario}></input>
                    </div>
                </div>
            </div>
        )
    }else {
        return (
            <div>
                <div className="tituloPerfilUsuario"><h1>Perfil del usuario</h1></div>
                <div className="boxDataUser">

                    <div className="infoUser1">
                        <div className="fotoUser"><img id="foto" src={PhotoRoom1} alt="Profile photo" height= "100" width="100" /></div>
                        <div className="empty"><button onClick={(()=>saveData(1))}>Editar</button></div>

                    </div>

                    <div className="infoUser2">
                        <input className="inputBaseUser" readonly="readonly" type="text" name="name"  placeholder={user.name} size="34" lenght='30'></input>
                        <input className="inputBaseUser" readonly="readonly" type="text" name="lastName1"  placeholder={user.lastName1} size="34" lenght='30' ></input>
                        <input className="inputBaseUser" readonly="readonly" type="text" name="lastName2"  placeholder={user.lastName2} size="34" lenght='30'></input>
                        <input className="inputBaseUser" readonly="readonly" type="text" name="email"  placeholder={user.email} size="34" lenght='30'></input>
                        <input className="inputBaseUser" readonly="readonly" type="password" name="password"  placeholder="************" size="34" lenght='8'></input>
                        <input className="inputBaseUser" readonly="readonly" type="password" name="password"  placeholder="************" size="34" lenght='8'></input>

                    </div>

                    <div className="infoUser3">
                        <input className="inputBaseUser"  type="text" name="address" onChange={updateFormulario} placeholder={user.address} size="34" lenght='30'></input>
                        <input className="inputBaseUser"  type="text" name="city" onChange={updateFormulario} placeholder={user.city} size="34" lenght='30'></input>
                        <input className="inputBaseUser"  type="text" name="country" onChange={updateFormulario}  placeholder={user.country} size="34" lenght='30'></input>
                        <input className="inputBaseUser" readonly type="text" name="dni"  placeholder={user.dni} size="34" maxlenght='9' ></input>
                        <input className="inputBaseUser"  type="text" name="telephone" onChange={updateFormulario}  placeholder={user.telephone} size="34" lenght='9'></input>
                        <input className="inputBaseUser" readonly type="text" name="birthday" placeholder={moment(user.birthday).format('L')} ></input>
                    </div>


                </div>

            </div>
        )
    }
}

export default connect((state)=>({
    credentials:state.credentials,
}))(NewRoom);