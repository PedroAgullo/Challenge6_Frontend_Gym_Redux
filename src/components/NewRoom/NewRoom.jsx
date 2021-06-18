
import './NewRoom.css';
import moment from 'moment';
import { connect } from 'react-redux';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import {UPDATE} from '../../redux/types'
import PhotoRoom1 from '../../images/zumba.png';
import PhotoRoom2 from '../../images/crossfit.png';
import PhotoRoom3 from '../../images/salsa.png';
import PhotoRoom4 from '../../images/spinning.png';
import PhotoRoom5 from '../../images/pilates.png';
import PhotoRoom6 from '../../images/boxeo.png';

const NewRoom = (props) => {        
        //Hooks
        const [profile, setProfile] = useState([]); 
        const [datosUser, setDatosUser] = useState(
            {

                address: props.credentials.user.address,
                country: props.credentials.user.country,
                city: props.credentials.user.city,
                telephone: props.credentials.user.telephone
        });        

    useEffect(() => {
        setProfile(1);
      }, []);

    let user = props.credentials.user;   

    const changeState = (info) => {        
        setProfile(info);
    }



    const updateFormulario = (e) => {
        setDatosUser({...datosUser, [e.target.name]: e.target.value});
    }


    const saveData = async (info) => {
        
        let token = props.credentials.token;
        let idUser = props.credentials.idUser;
        let address = datosUser.address;
        let country = datosUser.country;
        let city = datosUser.city;
        let telephone = datosUser.telephone;


        let body = {
            member : idUser,
            address : address,
            country : country,
            city : city,
            telephone : telephone
        }

        let res = await axios.put('http://localhost:3005/user',body,{headers:{'authorization':'Bearer ' + token}});
        let data = {
            token: props.credentials.token,
            user : res.data,
            idUser: props.credentials.userId,
            perfil: props.credentials.perfil
        }

        console.log ("RESULTADO DE AXIOS PARA DAVID", res.data);

        //Guardo en RDX
        props.dispatch({type:UPDATE,payload:data});
        setProfile(info);
    }


    if (profile === 1) {
        return (
            <div>
                <div className="tituloSala"><h1>NUEVA SALA</h1></div>
                <div className="boxDataSala">

                    <div className="infoSala1">
                        <div className="fotoUser"><img id="foto" src={PhotoRoom1} alt="Profile photo" height= "100" width="100" /></div>
                        <div className="empty"><button onClick={(()=>changeState(2))}>Guardar</button></div>
                    </div>

                    <div className="infoSala1">
                        {/* <input className="inputBaseUser" type="text" name="name"  placeholder={user.name} size="34" lenght='30'></input> */}
                        <div>Nombre</div>
                        <input className=""  type="text" name="name" value={user.name} size="34" lenght='30'></input>
                        <div>Fecha</div>
                        <input className="inputBaseUser"  type="date" name="lastName1"  value={user.lastName1} size="34" lenght='30' ></input>
                        <input className="inputBaseUser"  type="text" name="lastName2"  value={user.lastName2} size="34" lenght='30'></input>
                        <input className="inputBaseUser"  type="text" name="email"  value={user.email} size="34" lenght='30'></input>
                        <input className="inputBaseUser"  type="password" name="password"  value="************" size="34" lenght='8'></input>
                        <input className="inputBaseUser"  type="password" name="password"  value="************" size="34" lenght='8'></input>
                    </div>

                    <div className="infoSala1">
                        <input className="inputBaseUser"  type="text" name="address"  value={user.address} size="34" lenght='30'></input>
                        <input className="inputBaseUser"  type="text" name="city"  value={user.city} size="34" lenght='30'></input>
                        <input className="inputBaseUser"  type="text" name="country"  value={user.country} size="34" lenght='30'></input>
                        <input className="inputBaseUser"  type="text" name="dni"  value={user.dni} size="34" maxlenght='9' ></input>
                        <input className="inputBaseUser"  type="text" name="telephone"  value={user.telephone} size="34" lenght='9'></input>
                        <input className="inputBaseUser"  type="text" name="birthday" value={moment(user.birthday).format('L')} ></input>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        )
    }else {
        return (
            <div>
                <div className="tituloPerfilUsuario"><h1>EDITA LA SALA</h1></div>
                <div className="boxDataUser">

                    <div className="infoUser1">
                        <div className="fotoUser"><img id="foto" src={PhotoRoom1} alt="Profile photo" height= "100" width="100" /></div>
                        <div className="empty"><button onClick={(()=>saveData(1))}>Editar</button></div>

                    </div>

                    <div className="infoUser2">
                        <input className="inputBaseUser" type="text" name="name"  placeholder={user.name} size="34" lenght='30'></input>
                        <input className="inputBaseUser" type="date" name="lastName1"  placeholder={user.lastName1} size="34" lenght='30' ></input>
                        <input className="inputBaseUser" type="text" name="lastName2"  placeholder={user.lastName2} size="34" lenght='30'></input>
                        <input className="inputBaseUser" type="text" name="email"  placeholder={user.email} size="34" lenght='30'></input>
                        <input className="inputBaseUser" type="password" name="password"  placeholder="************" size="34" lenght='8'></input>
                        <input className="inputBaseUser" type="password" name="password"  placeholder="************" size="34" lenght='8'></input>
                    </div>

                    <div className="infoUser3">
                        <input className="inputBaseUser"  type="text" name="address" onChange={updateFormulario} placeholder={user.address} size="34" lenght='30'></input>
                        <input className="inputBaseUser"  type="text" name="city" onChange={updateFormulario} placeholder={user.city} size="34" lenght='30'></input>
                        <input className="inputBaseUser"  type="text" name="country" onChange={updateFormulario}  placeholder={user.country} size="34" lenght='30'></input>
                        <input className="inputBaseUser" type="text" name="dni"  placeholder={user.dni} size="34" maxlenght='9' ></input>
                        <input className="inputBaseUser"  type="text" name="telephone" onChange={updateFormulario}  placeholder={user.telephone} size="34" lenght='9'></input>
                        <input className="inputBaseUser" type="text" name="birthday" placeholder={moment(user.birthday).format('L')} ></input>
                    </div>

                </div>

            </div>
        )
    }
}

export default connect((state)=>({
    credentials:state.credentials,
}))(NewRoom);