
import './DataProfile.css';
// import PhotoProfile from '../../images/defaultFoto.png';
import PhotoProfile from '../../images/defaultFoto2.png';
import moment from 'moment';
import { connect } from 'react-redux';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import {LOGIN, UPDATE} from '../../redux/types'



const DataProfile = (props) => {


        
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
                <div className="tituloDataProfile"><h1>Perfil del usuario</h1></div>
                <div className="boxDataProfileUser">

                    <div className="infoUser1">
                        <div className="fotoUser"><img id="foto" src={PhotoProfile} alt="Profile photo" /></div>
                        <div className="empty"><button onClick={(()=>changeState(2))}>Editar</button></div>

                    </div>

                    <div className= "infoUser2Titulos">
                        <div className="titulosInfoUser">Nombre:</div>
                        <div className="titulosInfoUser">Primer apellido:</div>
                        <div className="titulosInfoUser">Segundo apellido:</div>
                        <div className="titulosInfoUser">Email:</div>
                        <div className="titulosInfoUser">Password:</div>
                     
                    </div>

                    <div className="infoUser2">
                        {/* <input className="inputBaseUser" type="text" name="name"  placeholder={user.name} size="34" lenght='30'></input> */}
                        <input className="inputBaseUser"  readonly="readonly" type="text" name="name" value={user.name} size="34" lenght='30'></input>
                        <input className="inputBaseUser"  readonly="readonly" type="text" name="lastName1"  value={user.lastName1} size="34" lenght='30' ></input>
                        <input className="inputBaseUser"  readonly="readonly" type="text" name="lastName2"  value={user.lastName2} size="34" lenght='30'></input>
                        <input className="inputBaseUser"  readonly="readonly" type="text" name="email"  value={user.email} size="34" lenght='30'></input>
                        <input className="inputBaseUser"  readonly="readonly" type="password" name="password"  value="************" size="34" lenght='8'></input>
                        

                    </div>

                    <div className= "infoUser2Titulos">
                        <div className="titulosInfoUser">Dirección:</div>
                        <div className="titulosInfoUser">Ciudad:</div>
                        <div className="titulosInfoUser">País:</div>
                        <div className="titulosInfoUser">DNI/NIE:</div>
                        <div className="titulosInfoUser">Telefono:</div>
                        <div className="titulosInfoUser">Fecha de nacimiento:</div>
                     
                    </div>

                    <div className="infoUser2">
                        <input className="inputBaseUser"  readonly="readonly" type="text" name="address"  value={user.address} size="34" lenght='30'></input>
                        <input className="inputBaseUser"  readonly="readonly" type="text" name="city"  value={user.city} size="34" lenght='30'></input>
                        <input className="inputBaseUser"  readonly="readonly" type="text" name="country"  value={user.country} size="34" lenght='30'></input>
                        <input className="inputBaseUser"  readonly="readonly" type="text" name="dni"  value={user.dni} size="34" maxlenght='9' ></input>
                        <input className="inputBaseUser"  readonly="readonly" type="text" name="telephone"  value={user.telephone} size="34" lenght='9'></input>
                        <input className="inputBaseUser"  readonly="readonly" type="text" name="birthday" value={moment(user.birthday).format('L')} ></input>
                    </div>
                    <div>
                    </div>

                </div>

            </div>
        )
    }else {
        return (
            <div>
                <div className="tituloDataProfile"><h1>Perfil del usuario</h1></div>
                <div className="boxDataProfileUser">

                    <div className="infoUser1">
                        <div className="fotoUser"><img id="foto" src={PhotoProfile} alt="Profile photo" height= "100" width="100" /></div>
                        <div className="empty"><button onClick={(()=>saveData(1))}>Guardar</button></div>

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
}))(DataProfile);