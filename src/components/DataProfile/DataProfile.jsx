
import './DataProfile.css';
// import PhotoProfile from '../../images/defaultFoto.png';
import PhotoProfile from '../../images/defaultFoto2.png';
import moment from 'moment';
import { connect } from 'react-redux';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import {LOGIN, UPDATE} from '../../redux/types'
import {Input, notification} from 'antd';



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


    // const [datosUser, setDatosUser] = useState(
    //     {
    //         name : '',
    //         lastName1: '',
    //         lastName2: '',
    //         email: '',
    //         password: '',
    //         birthday: '',
    //         address: '',
    //         country: '',
    //         city: '',
    //         dni: '',
    //         telephone: '',
    //         subscription: 'Mensual',
    // });

    const [errors, setErrors] = useState({
        eName : '',
        eLastName1: '',
        eLastName2: '',
        eEmail: '',
        ePassword: '',
        eBirthday: '',
        eAddress: '',
        eCountry: '',
        eCity: '',
        eDni: '',
        eTelephone: '',
        
    });



    useEffect(() => {
        setProfile(1);
      }, []);

    let user = props.credentials.user;   

    const changeState = (info) => {        
        setProfile(info);
    }



    const [newMessage, setNewMessage] = useState([]);

    //Handlers (manejadores)

    const updateFormulario = (e) => {
        setDatosUser({...datosUser, [e.target.name]: e.target.value});
    }


    const checkError = (arg) => {
        switch (arg){
            case 'name':
                
                if(datosUser.name.length < 1){
                    setErrors({...errors, eName: 'El campo nombre no puede estar vacío.'});
                }else if(datosUser.name.length < 2){
                    setErrors({...errors, eName: 'El nombre debe de tener al menos 2 caracteres'});
                }else if (! /^[a-z ,.'-]+$/i.test(datosUser.name) ) {
                    setErrors({...errors, eName: 'Introduce el formato de nombre valido'}); 
                }else{
                    setErrors({...errors, eName: ''});
                }
            break;


         



            case 'lastName1':
                if(datosUser.lastName1.length < 1){
                    setErrors({...errors, eLastName1: 'El campo Apellido no puede estar vacío.'});
                }else if (datosUser.lastName1.length < 2){
                    setErrors({...errors, eLastName1: 'El apellido debe de tener al menos 2 caracteres'});
                }else if (! /^[a-z ,.'-]+$/i.test(datosUser.lastName1) ) {
                    setErrors({...errors, eLastName1: 'Introduce el formato de apellido valido'});     
                }else{
                    setErrors({...errors, eLastName1: ''});
                }
                
            break;

            case 'lastName2':
                if(datosUser.lastName2.length < 1){
                    setErrors({...errors, eLastName2: 'El campo Apellido no puede estar vacío.'});
                }else if (datosUser.lastName2.length < 4){
                    setErrors({...errors, eLastName2: 'El campo Apellido debe de tener 4 caracteres'});
                }else if (! /^[a-z ,.'-]+$/i.test(datosUser.lastName2) ) {
                    setErrors({...errors, eLastName2: 'Introduce el formato de apellido valido'}); 
                }else{
                    setErrors({...errors, eLastName2: ''});
                }                
            break;


            case 'email':
                if(datosUser.email.length < 1){
                    setErrors({...errors, eEmail: 'El campo email no puede estar vacío.'});
                }else if (datosUser.email.length < 4){
                    setErrors({...errors, eEmail: 'El email debe de tener 4 caracteres'});
                }else if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(datosUser.email) ) {
                    setErrors({...errors, eEmail: 'Introduce el formato de email valido ejemplo@ejemplo.com'});                    
                }else{
                    setErrors({...errors, eEmail: ''});
                }
                
            break;

            case 'password':
                if(datosUser.password.length < 1){
                    setErrors({...errors, ePassword: 'El campo password no puede estar vacío.'});
                }else if (datosUser.password.length < 6){
                    setErrors({...errors, ePassword: 'El password debe de tener al menos 6 caracteres'});
                }else if (!/^\+?[0-9]{6}/.test(datosUser.password) ) {
                    setErrors({...errors, ePassword: 'Introduce el password valido'}); 
                }else{
                    setErrors({...errors, ePassword: ''});
                }
                
            break;

          

            case 'address':
                if(datosUser.address.length < 1){
                    setErrors({...errors, eAddress: 'El campo direccion no puede estar vacío.'});
                }else if  (!/^(?=.{3,40}$)[a-zA-ZñÑ 1-9 , /]+(?:[-'\s][a-zA-Z]+[-!$%^&*()_+|~=`{}";'<>?,.]+)*$/.test(datosUser.address)){
                    setErrors({...errors, eAddress: 'La direccion debe ser alfanumerica'});
                }else{
                    setErrors({...errors, eAddress: ''});
                }                
            break;

            case 'city':
                if(datosUser.city.length < 1){
                    setErrors({...errors, eCity: 'El campo ciudad no puede estar vacío.'});
                }else if  (! /^[a-z ,.'-]+$/i.test(datosUser.city) ) {
                    setErrors({...errors, eCity: 'El campo ciudad solo puede contener letras'});
                }else{
                    setErrors({...errors, eCity: ''});
                }
                
            break;

            case 'country':
                if(datosUser.country.length < 1){
                    setErrors({...errors, eCountry: 'El campo país no puede estar vacío.'});
                }else if  (!/^(?=.{3,40}$)[a-zA-ZñÑ]+(?:[-'\s][a-zA-Z]+[-!$%^&*()_+|~=`{}";'<>?,.]+)*$/.test(datosUser.country) ) {
                    setErrors({...errors, eCountry: 'El campo pais solo puede contener letras.'});
                }else{
                    setErrors({...errors, eCountry: ''});
                }
                
            break;

            case 'dni':
                if(datosUser.dni.length < 1){
                    setErrors({...errors, eDni: 'El campo DNI no puede estar vacío.'});
                }else if  (! /^\d{8}[a-zA-Z]$/.test(datosUser.dni) ){
                    setErrors({...errors, eDni: 'Formato de DNI incorrecto.'});
                }else{
                    setErrors({...errors, eDni: ''});
                }
            

            break;
            case 'telephone':
                if(datosUser.telephone.length < 1){
                    setErrors({...errors, eTelephone: 'El campo telefono no puede estar vacío.'});
                }else if (datosUser.telephone.length < 9){
                    setErrors({...errors, eTelephone: 'El campo telefono debe de tener 9 números'});
                }else if (! /[\d()+-]{9}/g.test(datosUser.telephone)) {
                    setErrors({...errors, eTelephone: 'Introduce el formato de teléfono valido 999999999'});                        
                }else{
                    setErrors({...errors, eTelephone: ''});
                }
          

            break;

        }
    }


    const saveData = async (info) => {        
        let token = props.credentials.token;
        let idUser = props.credentials.user._id;
        let address = datosUser.address;
        let city = datosUser.city;
        let country = datosUser.country;
        let telephone = datosUser.telephone;
        console.log(idUser)

        var body = {
            member : idUser,
            id : idUser,
            address : address,
            country : country,
            city : city,
            telephone : telephone,
            
        }

        console.log(props.credentials.perfil)
        if (props.credentials.perfil === "user"){
            console.log(body, "Datos de body que pasamos");
            let token = props.credentials.token;

            var res = await axios.put('https://xsmilegymback.herokuapp.com/user',body,{headers:{'authorization':'Bearer ' + token}});
            



            let data = {
                token: token,
                user : res.data,
                idUser: res.data._id,
                perfil: "user"
            }
                console.log("Datos qeu devuelve axios : ", data);

                props.dispatch({type:UPDATE,payload:data});
                notification.success({message:'Atencion.',description: "Datos actualizados correctamente."});

                setProfile(info);
            
        }else {
            console.log("Estoy en monitor")
            console.log(body)

            let token2 = props.credentials.token;

            let res2 = await axios.post('https://xsmilegymback.herokuapp.com/monitor/update',body,{headers:{'authorization':'Bearer ' + token}});
            console.log (res2);
            let data2 = {
                token: token2,
                user : res2.data,
                idUser: res2.data.user._id,
                perfil: "monitor"
            }        
            console.log("Datos qeu devuelve axios : ", data2);

            props.dispatch({type:UPDATE,payload:data2});
            notification.success({message:'Atencion.',description: "Datos actualizados correctamente."});

            setProfile(info);


            
        }


        
    }

    if (profile === 1) {
        return (
            <div>
                <div className="tituloDataProfile"><h1>Perfil del usuario</h1></div>
                <div className="boxDataProfileUser">

                    <div className="infoUser1">
                        <div className="fotoUser"><img id="foto" src={props.credentials.user.photo} alt="Profile photo" /></div>
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
                        <input className="inputBaseUser"  readonly="readonly" type="text" name="address" value={user.address} size="34" lenght='30'></input>
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
                <div className="tituloDataProfile"><h1>Editar datos del usuario</h1></div>
                <div className="boxDataProfileUser">

                    <div className="infoUser1">
                    <div className="fotoUser"><img id="foto" src={props.credentials.user.photo} alt="Profile photo" /></div>
                        <div className="empty"><button onClick={(()=>saveData(1))}>Guardar</button></div>

                    </div>

                    <div className= "infoUser2Titulos">
                        <div className="titulosInfoUser">Nombre:</div>
                        <div className="titulosInfoUser">Primer apellido:</div>
                        <div className="titulosInfoUser">Segundo apellido:</div>
                        <div className="titulosInfoUser">Email:</div>
                        <div className="titulosInfoUser">Password:</div>
                     
                    </div>

                    <div className="infoUser2">
                        <input className="inputBaseUser" readonly="readonly" type="text" name="name"  placeholder={user.name} size="34" lenght='30'></input>
                        <input className="inputBaseUser" readonly="readonly" type="text" name="lastName1"  placeholder={user.lastName1} size="34" lenght='30' ></input>
                        <input className="inputBaseUser" readonly="readonly" type="text" name="lastName2"  placeholder={user.lastName2} size="34" lenght='30'></input>
                        <input className="inputBaseUser" readonly="readonly" type="text" name="email"  placeholder={user.email} size="34" lenght='30'></input>
                        <input className="inputBaseUser" readonly="readonly" type="password" name="password"  placeholder="************" size="34" lenght='8'></input>

                    </div>

                    <div className= "infoUser2Titulos">

                        <div className="titulosInfoUser">Dirección:</div>
                        <div className="titulosInfoUser">Ciudad:</div>
                        <div className="titulosInfoUser">País:</div>
                        <div className="titulosInfoUser">DNI/NIE:</div>
                        <div className="titulosInfoUser">Telefono:</div>
                        <div className="titulosInfoUser">Fecha de nacimiento:</div>

                     
                    </div>

                    <div className="infoUser3">

                        <input className="inputBaseUser"  type="text" name="address" onChange={updateFormulario} onBlur={()=>checkError("address")} placeholder={props.credentials.user.address} size="34" lenght='30'></input>
                        <div>{errors.eAddress}</div>
                        <input className="inputBaseUser"  type="text" name="city" onChange={updateFormulario} onBlur={()=>checkError("city")} placeholder={props.credentials.user.city} size="34" lenght='30'></input>
                        
                        <div>{errors.eCity}</div>
                        <input className="inputBaseUser" type="text" name="country" onChange={updateFormulario} onBlur={()=>checkError("country")} placeholder={props.credentials.user.country} size="34" lenght='30'></input>
                        {/* <input className="inputBaseUser" type="text" name="country" onChange={updateFormulario} onBlur={()=>checkError("country")}  placeholder={user.country} size="34" lenght='30'></input> */}
                        <div>{errors.eCountry}</div>
                        <input className="inputBaseUser" readonly="readonly" type="text" name="dni"  placeholder={user.dni} size="34" maxlenght='9' ></input>
                        <input className="inputBaseUser"  type="text" name="telephone" onChange={updateFormulario} onBlur={()=>checkError("telephone")}   placeholder={props.credentials.user.telephone}size="34" lenght='9'></input>
                        <div>{errors.eTelephone}</div>
                        <input className="inputBaseUser" readonly="readonly" type="text" name="birthday" placeholder={moment(user.birthday).format('L')} ></input>

                    </div>


                </div>

            </div>
        )
    }
}

export default connect((state)=>({
    credentials:state.credentials,
}))(DataProfile);