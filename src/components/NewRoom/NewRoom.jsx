
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

        const [photoRoom, setPhotoRoom] = useState(           
                PhotoRoom1
        ); 



    useEffect(() => {
        setProfile(1);
      }, []);

    let user = props.credentials.user;   

    const changeState = (info) => {        
        setProfile(info);
    }



    const updateFormulario = (e) => {
        setDatosRoom({...datosRoom, [e.target.name]: e.target.value});
        if (e.target.name === "name"){

            switch(e.target.value){
                case "Zumba":
                    setPhotoRoom(PhotoRoom1);
                    return
                case "Crossfit":
                    setPhotoRoom(PhotoRoom2);
                    return
                case "Salsa":
                    setPhotoRoom(PhotoRoom3);
                    return
                case "Spinning":
                    setPhotoRoom(PhotoRoom4);
                    return
                case "Pilates":
                    setPhotoRoom(PhotoRoom5);
                    return
                case "Boxeo":
                    setPhotoRoom(PhotoRoom6);
                    return
                default:
                    return
            }
        }

    }


    const saveData = async (info) => {
        
        let token = props.credentials.token;
        let dateStart = moment(datosRoom.dateStart).format();
        let dateEnd = moment(dateStart).add(1, 'hours').format();
   
    


        
        let body = {    
            id : props.credentials.user._id,        
            name: datosRoom.name,
            dateStart : dateStart,
            dateEnd : dateEnd,
        }

        let res = await axios.post('http://localhost:3005/room',body,{headers:{'authorization':'Bearer ' + token}});
        


        //Guardo en RDX
        // props.dispatch({type:UPDATE,payload:data});
        setProfile(info);

    }


    if (props.editroom._id === "") {
        return (
            <div>
                <div className="tituloNewRoom"><h1>Nueva sala</h1></div>
                <div className="boxDataUser">

                    <div className="InfoNewRoom1">
                        <div className="fotoRoom1"><img id="fotoRoom1" src={photoRoom} alt="Profile photo" /></div>
                        

                    </div>

                    <div className= "infoUser2Titulos">
                        <div className="titulosInfoRoom">Nombre:</div>
                        <div className="titulosInfoRoom">Fecha y hora de inicio: </div>
                        <div className="empty"></div>

                        
                     
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

                            <div className="empty"><button onClick={(()=>saveData(2))}>Guardar</button></div>
                    </div>
                </div>
            </div>
        )
    }else {
        return (
            <div>
                <div className="tituloNewRoom"><h1>EDITAR DATOS SALA</h1></div>
                <div className="boxDataUser">

                    <div className="InfoNewRoom1">
                        <div className="fotoRoom1"><img id="fotoRoom1" src={photoRoom} alt="Profile photo" /></div>
                        

                    </div>

                    <div className= "infoUser2Titulos">
                        <div className="titulosInfoRoom">Nombre:</div>
                        <div className="titulosInfoRoom">Fecha y hora de inicio: </div>
                        <div className="titulosInfoRoom">Entrenador: </div>
                        <div className="titulosInfoRoom">Usuarios:  </div>
                        <div className="titulosInfoRoom">Clase activa</div>
                        <div className="empty"></div>                     
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

                            <select id = "opciones" name="name" className="inputBaseUser" onChange={updateFormulario}>
                                {props.editroom.monitors.map((act, index) => (
                                    <option>{act.name}{" "}{act.lastName1}</option>                                
                                ))}
                            </select>   

                                <select id = "opciones" name="name" className="inputBaseUser" onChange={updateFormulario}> 
                                {props.editroom.users.map((act, index) => (
                                    <option value={act}>{act.name}{" "}{act.lastName1}{" "}{act.lastName2}{}</option>                                
                                ))}
                                </select>    
                            <input className="inputBaseUser" type="checkbox" name="Activa" size="34" lenght='30' onChange={updateFormulario}></input>
                    

                            <div className="empty"><button onClick={(()=>saveData(2))}>Guardar</button></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state)=>({
    credentials:state.credentials,
    editroom : state.editroom
}))(NewRoom);