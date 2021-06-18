
import './DataProfile.css';
// import PhotoProfile from '../../images/defaultFoto.png';
import PhotoProfile from '../../images/defaultFoto2.png';
import moment from 'moment';
import { connect } from 'react-redux';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import {LOGIN} from '../../redux/types'



const DataProfile = (props) => {


        
    const [profile, setProfile] = useState([]); 
    
    useEffect(() => {
        setProfile(1);
      }, []);

    let user = props.credentials.user;   

    const changeState = (info) => {        
        setProfile(info);
    }

    const saveData = async (info) => {
        
        let token = props.credentials.token;
        let idUser = props.credentials.idUser;
        // let address = document.getElementById("address").value;
        // let country = document.getElementById("country").value;
        // let city = document.getElementById("city").value;
        console.log(idUser);
        console.log(token);
        // console.log (address);
        // console.log(country);
        // console.log(city);

        let body = {
            member : idUser,
            address : "Gran via",
            country : "Spain",
            city : "Valencia"
        }

        console.log (body);

        let res = await axios.put('http://localhost:3005/user',body,{headers:{'authorization':'Bearer ' + token}});
        let data = {
            token : props.credentials.token,
            user : (res.data.user),
            idUser: props.credentials.idUser,
            perfil: props.credentials.perfil
        }


        //Guardo en RDX
        props.dispatch({type:LOGIN,payload:data});
        setProfile(info);

    }


    if (profile === 1) {
        return (
            <div>
                <div className="tituloPerfilUsuario"><h1>Perfil del usuario</h1></div>
                <div className="boxDataUser">

                    <div className="infoUser1">
                        <div className="fotoUser"><img id="foto" src={PhotoProfile} alt="Profile photo" height= "100" width="100" /></div>
                        <div className="empty"><button onClick={(()=>changeState(2))}>Editar</button></div>

                    </div>

                    <div className="infoUser2">
                        {/* <input className="inputBaseUser" type="text" name="name"  placeholder={user.name} size="34" lenght='30'></input> */}
                        <input className="inputBaseUser"  readonly type="text" name="name" value={user.name} size="34" lenght='30'></input>
                        <input className="inputBaseUser"  readonly type="text" name="lastName1"  value={user.lastName1} size="34" lenght='30' ></input>
                        <input className="inputBaseUser"  readonly type="text" name="lastName2"  value={user.lastName2} size="34" lenght='30'></input>
                        <input className="inputBaseUser"  readonly type="text" name="email"  value={user.email} size="34" lenght='30'></input>
                        <input className="inputBaseUser"  readonly type="password" name="password"  value="************" size="34" lenght='8'></input>
                        <input className="inputBaseUser"  readonly type="password" name="password"  value="************" size="34" lenght='8'></input>

                    </div>

                    <div className="infoUser3">
                        <input className="inputBaseUser"  readonly type="text" name="address"  value={user.address} size="34" lenght='30'></input>
                        <input className="inputBaseUser"  readonly type="text" name="city"  value={user.city} size="34" lenght='30'></input>
                        <input className="inputBaseUser"  readonly type="text" name="country"  value={user.country} size="34" lenght='30'></input>
                        <input className="inputBaseUser"  readonly type="text" name="dni"  value={user.dni} size="34" maxlenght='9' ></input>
                        <input className="inputBaseUser"  readonly type="text" name="telephone"  value={user.telephone} size="34" lenght='9'></input>
                        <input className="inputBaseUser"  readonly type="text" name="birthday" value={moment(user.birthday).format('L')} ></input>
                    </div>
                    <div>
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
                        <div className="fotoUser"><img id="foto" src={PhotoProfile} alt="Profile photo" height= "100" width="100" /></div>
                        <div className="empty"><button onClick={(()=>saveData(1))}>Guardar</button></div>

                    </div>

                    <div className="infoUser2">
                        <input className="inputBaseUser" id="name"      type="text" name="name"  placeholder={user.name} size="34" lenght='30'></input>
                        <input className="inputBaseUser" id="lastName1" type="text" name="lastName1"  placeholder={user.lastName1} size="34" lenght='30' ></input>
                        <input className="inputBaseUser" id="lastName2" type="text" name="lastName2"  placeholder={user.lastName2} size="34" lenght='30'></input>
                        <input className="inputBaseUser" id="email"     type="text" name="email"  placeholder={user.email} size="34" lenght='30'></input>
                        <input className="inputBaseUser" id="password"  type="password" name="password"  placeholder="************" size="34" lenght='8'></input>
                        <input className="inputBaseUser" id="password"  type="password" name="password"  placeholder="************" size="34" lenght='8'></input>

                    </div>

                    <div className="infoUser3">
                        <input className="inputBaseUser" id="addres"    type="text" name="address"  placeholder={user.address} size="34" lenght='30'></input>
                        <input className="inputBaseUser" id="city"      type="text" name="city"  placeholder={user.city} size="34" lenght='30'></input>
                        <input className="inputBaseUser" id="country"   type="text" name="country"  placeholder={user.country} size="34" lenght='30'></input>
                        <input className="inputBaseUser" id="dni"       type="text" name="dni"  placeholder={user.dni} size="34" maxlenght='9' ></input>
                        <input className="inputBaseUser" id="telephone" type="text" name="telephone"  placeholder={user.telephone} size="34" lenght='9'></input>
                        <input className="inputBaseUser" id="birtday"   type="text" name="birthday" placeholder={moment(user.birthday).format('L')} ></input>
                    </div>


                </div>

            </div>
        )
    }
}

export default connect((state)=>({
    credentials:state.credentials,
}))(DataProfile);