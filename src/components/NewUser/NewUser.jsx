
import './NewUser.css';
// import PhotoProfile from '../../images/defaultFoto.png';
import PhotoProfile from '../../images/defaultFoto2.png';
import moment from 'moment';
import { connect } from 'react-redux';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import {LOGIN, UPDATE} from '../../redux/types'
import {Input, notification} from 'antd';



const NewUser = (props) => {
       


        //Hooks
        const [profile, setProfile] = useState([]); 
        // const [datosUser, setDatosUser] = useState(
        //     {

        //         address: props.credentials.user.address,
        //         country: props.credentials.user.country,
        //         city: props.credentials.user.city,
        //         telephone: props.credentials.user.telephone
        // });        


    const [datosUser, setDatosUser] = useState(
        {
            name : '',
            lastName1: '',
            lastName2: '',
            email: '',
            password: '',
            birthday: '',
            address: '',
            country: '',
            city: '',
            dni: '',
            telephone: '',
            subscription: ''
    });

    const [datosMonitor, setDatosMonitor] = useState(
        {
            _id: '',
            name : '',
            lastName1: '',
            lastName2: '',
            email: '',
            password: '',
            birthday: '',
            address: '',
            country: '',
            city: '',
            dni: '',
            telephone: '',
            subscription: ''            
    });

    const [errors, setErrors] = useState({
        name : datosUser.name,
        lastName1: datosUser.lastName1,
        lastName2: datosUser.lastName2,
        email: datosUser.email,
        password: datosUser.password,
        birthday: datosUser.birthday,
        address: datosUser.address,
        country: datosUser.country,
        city: datosUser.city,
        dni: datosUser.dni,
        telephone: datosUser.telephone,        
        
    });



    useEffect(() => {
        setProfile(1);
      }, []);

    let user = props.credentials.user;   



    const findEmail = async (info) => {    
        let token = props.credentials.token;

        try {
            
            let body = {
                email : datosUser.email
            }
            let res = await axios.post('http://localhost:3005/user/email',body,{headers:{'authorization':'Bearer ' + token}});
            notification.success({message:'Busqueda con éxito.',description: "Usuario encontrado" });
            setDatosMonitor(res.data);
            setProfile(info);
        } catch (err) {

        }
    }


    const updateMonitor = async (info) => {        
        let token = props.credentials.token;
        let idUser = props.credentials.user._id;
        let address = datosUser.address;
        let country = datosUser.country;
        let city = datosUser.city;
        let telephone = datosUser.telephone;

        let body = {
            member : datosMonitor._id,
            address : address,
            country : country,
            city : city,
            telephone : telephone,
            subscription : datosUser.subscription
            
        }

        console.log(body, "Datos de body que pasamos");
        let res = await axios.post('http://localhost:3005/user/update',body,{headers:{'authorization':'Bearer ' + token}});
    
        let data = {
            token: props.credentials.token,
            user : res.data,
            idUser: props.credentials.userId,
            perfil: props.credentials.perfil
        }

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
                }else if (! /^[a-zA-ZñÑ ,.'-]+$/i.test(datosUser.name) ) {
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
                }else if (!/^(?=.{3,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+[-!$%^&*()_+|~=`{}";'<>?,.]+)*$/.test(datosUser.lastName1) ) {
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
                }else if (!/^(?=.{3,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+[-!$%^&*()_+|~=`{}";'<>?,.]+)*$/.test.test(datosUser.lastName2) ) {
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
                }else if  (!/^(?=.{3,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+[-!$%^&*()_+|~=`{}";'<>?,.]+)*$/.test(datosUser.address)){
                    setErrors({...errors, eAddress: 'La direccion debe ser alfanumerica'});
                }else{
                    setErrors({...errors, eAddress: ''});
                }                
            break;

            case 'city':
                if(datosUser.city.length < 1){
                    setErrors({...errors, eCity: 'El campo ciudad no puede estar vacío.'});
                }else if  (!/^[a-zA-Z]+(?:[-'\s][a-zA-Z]+[-!$%^&*()_+|~=`{}";'<>?,.]+)*$/.test.test(datosUser.city) ) {
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

            
            case 'birthday':
                
                let years = moment().diff(moment(datosUser.birthday).format('MM/DD/YYYY'), 'years');
                
                if (years < 12 || years > 100){
                    setErrors({...errors, eBirthday: 'Debes tener al menos 12 años para poder acceder al gimnasio.'});
                }else {
                    setErrors({...errors, eBirthday: ''});
                }
         
            break;


        }
    }


    const saveData = async (info) => {        
        let token = props.credentials.token;
    
        let body = {
            name : datosUser.name,
            lastName1: datosUser.lastName1,
            lastName2: datosUser.lastName2,
            email: datosUser.email,
            password: datosUser.password,
            birthday: datosUser.birthday,
            address: datosUser.address,
            country: datosUser.country,
            city: datosUser.city,
            dni: datosUser.dni,
            telephone: datosUser.telephone,
            subscription: datosUser.subscription        
        }

        console.log("Body que le pasamos a axios", body);
        try {
            let res = await axios.post('http://localhost:3005/user',body,{headers:{'authorization':'Bearer ' + token}});
            notification.success({message:'Atencion.',description: "Nuevo coach creado correctamente."});


        } catch (err) {
            var errorText = err.response.data.message;
            if (errorText.includes("email")){
                notification.warning({message:'Atencion.',description: "El email ya existe en la base de datos."});

            }else if (errorText.includes("dni")){
                notification.warning({message:'Atencion.',description: "El dni ya existe en la base de datos"});

            }else{
                notification.error({message:'Atencion.',description: "Tenemos problemas en la base de datos. Póngase en contacto con el administrador."});
            }
        }

  
        
    }

    if (profile === 1) {
        return (
            <div>
                <div className="tituloDataProfile"><h1>Nuevo usuario</h1></div>
                <div className="boxDataProfileUser">

                    <div className="infoUser1">
                        <div className="fotoUser"><img id="foto" src={PhotoProfile} alt="Profile photo" /></div>
                        <div className="empty"><button onClick={(()=>saveData())}>Guardar</button></div>
                        <div className="empty"><button onClick={(()=>findEmail(2))}>Buscar</button></div>
                    </div>

                    <div className= "infoUser2Titulos">
                        <div className="titulosInfoUser">Nombre:</div>
                        <div className="titulosInfoUser">Primer apellido:</div>
                        <div className="titulosInfoUser">Segundo apellido:</div>
                        <div className="titulosInfoUser">Email:</div>
                        <div className="titulosInfoUser">Password:</div>
                        <div className="titulosInfoUser">Suscripcion:</div>
                     
                    </div>

                    <div className="infoUser2">
                        <input className="inputBaseUser"  type="text" name="name" onChange={updateFormulario} onBlur={()=>checkError("name")} size="34" lenght='30'></input>
                        <div>{errors.eName}</div>
                        <input className="inputBaseUser"  type="text" name="lastName1" onChange={updateFormulario} onBlur={()=>checkError("lastName1")} size="34" lenght='30' ></input>
                        <div>{errors.eLastName1}</div>
                        <input className="inputBaseUser"  type="text" name="lastName2" onChange={updateFormulario} onBlur={()=>checkError("lastName2")} size="34" lenght='30'></input>
                        <div>{errors.eLastName2}</div>
                        <input className="inputBaseUser"  type="text" name="email"onChange={updateFormulario} onBlur={()=>checkError("email")}  size="34" lenght='30'></input>
                        <div>{errors.eEmail}</div>
                        <input className="inputBaseUser"  type="password" name="password"onChange={updateFormulario} onBlur={()=>checkError("password")}   size="34" lenght='8'></input>
                        <div>{errors.ePassword}</div>
                        <select id="op" className="inputBase" type="select" name="subscription" onChange={updateFormulario} required="true" placeholder="Abono"  lenght='30'>
                            <option value="Mensual">Mensual</option>
                            <option value="Anual">Anual</option>
                            <option value="Premium">Premium</option>
                        </select>  

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
                        <input className="inputBaseUser"   type="text" name="address" onChange={updateFormulario} onBlur={()=>checkError("address")} size="34" lenght='30'></input>
                        <div>{errors.eAddress}</div>
                        <input className="inputBaseUser"   type="text" name="city" onChange={updateFormulario} onBlur={()=>checkError("city")}  size="34" lenght='30'></input>
                        <div>{errors.eCity}</div>
                        <input className="inputBaseUser"   type="text" name="country"onChange={updateFormulario} onBlur={()=>checkError("country")}  size="34" lenght='30'></input>
                        <div>{errors.eCountry}</div>
                        <input className="inputBaseUser"   type="text" name="dni" onChange={updateFormulario} onBlur={()=>checkError("dni")}  size="34" maxlenght='9' ></input>
                        <div>{errors.eDni}</div>
                        <input className="inputBaseUser"  type="text" name="telephone"  onChange={updateFormulario} onBlur={()=>checkError("telephone")} size="34" lenght='9'></input>
                        <div>{errors.eTelephone}</div>
                        <input className="inputBaseUser"   type="date" name="birthday" onChange={updateFormulario} onBlur={()=>checkError("birthday")} ></input>
                        <div>{errors.eBirthday}</div>
                    </div>
                    <div>
                    </div>

                </div>

            </div>
        )
    }else {
        return (
            <div>
                <div className="tituloDataProfile"><h1>Editar usuario</h1></div>
                <div className="boxDataProfileUser">

                    <div className="infoUser1">
                    <div className="fotoUser"><img id="foto" src={PhotoProfile} alt="Profile photo" /></div>
                        <div className="empty"><button onClick={(()=>updateMonitor(1))}>Guardar</button></div>

                    </div>

                    <div className= "infoUser2Titulos">
                        <div className="titulosInfoUser">Nombre:</div>
                        <div className="titulosInfoUser">Primer apellido:</div>
                        <div className="titulosInfoUser">Segundo apellido:</div>
                        <div className="titulosInfoUser">Email:</div>
                        <div className="titulosInfoUser">Password:</div>
                        <div className="titulosInfoUser">Suscripcion:</div>
                     
                    </div>

                    <div className="infoUser2">
                        <input className="inputBaseUser" value={datosMonitor.name} readonly="readonly" type="text" name="name"  size="34" lenght='30'></input>
                        <input className="inputBaseUser" value={datosMonitor.lastName1} readonly="readonly" type="text" name="lastName1"   size="34" lenght='30' ></input>
                        <input className="inputBaseUser" value={datosMonitor.lastName2} readonly="readonly" type="text" name="lastName2"   size="34" lenght='30'></input>
                        <input className="inputBaseUser" value={datosMonitor.email} readonly="readonly" type="text" name="email"   size="34" lenght='30'></input>
                        <input className="inputBaseUser" value={datosMonitor.password} readonly="readonly" type="password" name="password"  placeholder="************" size="34" lenght='8'></input>
                        <select id="op" className="inputBase" type="select" name="subscription" onChange={updateFormulario} required="true" placeholder="Abono"  lenght='30'>
                            <option value="Mensual">Mensual</option>
                            <option value="Anual">Anual</option>
                            <option value="Premium">Premium</option>
                        </select>  
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
                        <input className="inputBaseUser" placeholder={datosMonitor.address} type="text" name="address" onChange={updateFormulario} onBlur={()=>checkError("address")}  size="34" lenght='30'></input>                        
                        <div>{errors.eAddress}</div>
                        <input className="inputBaseUser" placeholder={datosMonitor.city} type="text" name="city" onChange={updateFormulario} onBlur={()=>checkError("city")}  size="34" lenght='30'></input>
                        <div>{errors.eCity}</div>
                        <input className="inputBaseUser" placeholder={datosMonitor.country} type="text" name="country" onChange={updateFormulario} onBlur={()=>checkError("country")}  size="34" lenght='30'></input>
                        <div>{errors.eCountry}</div>
                        <input className="inputBaseUser" value={datosMonitor.dni} readonly="readonly" type="text" name="dni"  size="34" maxlenght='9' ></input>
                        <input className="inputBaseUser" placeholder={datosMonitor.telephone} type="text" name="telephone" onChange={updateFormulario} onBlur={()=>checkError("telephone")}  size="34" lenght='9'></input>
                        <div>{errors.eTelephone}</div>
                        <input className="inputBaseUser" value={moment(datosMonitor.birthday).format('LL')} readonly="readonly" type="text" name="birthday" ></input>
                    </div>


                </div>

            </div>
        )
    }
}

export default connect((state)=>({
    credentials:state.credentials,
}))(NewUser);