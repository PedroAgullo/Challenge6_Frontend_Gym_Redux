
import React, {useState} from 'react';
import "./Register.css";
import axios from 'axios';
import {useHistory} from "react-router";
import moment from 'moment';
import {connect} from 'react-redux';
import {Input, notification} from 'antd';

const Register = () => {
    let history = useHistory();

    //Hooks
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
            subscription: 'Mensual',
    });

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
                }else if  (! /^[a-z 1-9,.'-]+$/i.test(datosUser.address)){
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

            
            case 'birthday':
                
                let years = moment().diff(moment(datosUser.birthday).format('MM/DD/YYYY'), 'years');
                
                if (years < 12 || years > 100){
                    setErrors({...errors, eBirthday: 'Debes tener al menos 12 años para registrarte.'});
                }else {
                    setErrors({...errors, eBirthday: ''});
                }
         
            break;


        }
    }

    const ejecutaRegistro = async () => {
        

        let  user = {
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
            subscription: datosUser.subscription,
        }

        var  array = Object.entries(user);
        var num = array.length;

        for (let x = 0; x < num; x++){
            if(array[x][1] === ''){
                let campoVacio = ("El campo " + array[x][0] + " no puede estar vacío.");
                return setNewMessage(campoVacio);
            }

        }


        

       
         axios.post(("http://localhost:3005/user"), user)        
        .then(res => {
            notification.success({message:'Usuario registrado.',description: "Te hemos enviado un email para activar la cuenta." });

            setTimeout(()=> {
                history.push('/login');
            }, 5000);     
        }).catch(err => {
           
            var errorText = err.response.data.message;
            if (errorText.includes("email")){
                setNewMessage(JSON.stringify("El email ya existe en la base de datos."));

            }else if (errorText.includes("dni")){
                setNewMessage(JSON.stringify("El dni ya existe en la base de datos."));

            }else if (errorText.includes("telephone")){
                setNewMessage(JSON.stringify("El teléfono ya existe en la base de datos."));
            }else{
                setNewMessage(JSON.stringify(err.response.data.message));            
            }
            
        });     
      
   
    }    

    return (
        <div className= "boxForm">
            <div className= "tituloFormRegistro"> FORMULARIO DE REGISTRO </div>
            <div className="formulario">
                <input className="inputBase" type="text" name="name" onChange={updateFormulario} onBlur={()=>checkError("name")} placeholder="Nombre" size="34" lenght='30'></input>
                <div>{errors.eName}</div>
                <input className="inputBase" type="text" name="lastName1" onChange={updateFormulario} onBlur={()=>checkError("lastName1")} placeholder="Primer apellido" size="34" lenght='30' ></input>
                <div>{errors.eLastName1}</div>
                <input className="inputBase" type="text" name="lastName2" onChange={updateFormulario} onBlur={()=>checkError("lastName2")} placeholder="Segundo apellido" size="34" lenght='30'></input>
                <div>{errors.eLastName2}</div>
                <input className="inputBase" type="text" name="email" onChange={updateFormulario} onBlur={()=>checkError("email")} placeholder="Email" size="34" lenght='30'></input>
                <div>{errors.eEmail}</div>
                <input className="inputBase" type="password" name="password" onChange={updateFormulario} onBlur={()=>checkError("password")} placeholder="Password" size="34" lenght='8'></input>
                <div>{errors.ePassword}</div>
                <input className="inputBase" type="text" name="address" onChange={updateFormulario} onBlur={()=>checkError("address")} placeholder="Dirección" size="34" lenght='30'></input>
                <div>{errors.eAddress}</div>
                <input className="inputBase" type="text" name="city" onChange={updateFormulario} onBlur={()=>checkError("city")} placeholder="Ciudad" size="34" lenght='30'></input>
                <div>{errors.eCity}</div>
                <input className="inputBase" type="text" name="country" onChange={updateFormulario} onBlur={()=>checkError("country")} placeholder="Pais" size="34" lenght='30'></input>
                <div>{errors.eCountry}</div>
                <input className="inputBase" type="text" name="dni" onChange={updateFormulario} onBlur={()=>checkError("dni")} placeholder="DNI" size="34" maxlenght='9' ></input>
                <div>{errors.eDni}</div>
                <input className="inputBase" type="text" name="telephone" onChange={updateFormulario} onBlur={()=>checkError("telephone")} placeholder="Teléfono" size="34" lenght='9'></input>
                <div>{errors.eTelephone}</div>
                <input className="inputBase" type="date" name="birthday" onChange={updateFormulario} onBlur={()=>checkError("birthday")} placeholder="Fecha de nacimiento :" onchange="this.className=(this.value!=''?'has-value':'')"></input>
                <div>{errors.eBirthday}</div>
                <select id="op" className="inputBase" type="select" name="subscription" onChange={updateFormulario} required="true" placeholder="Abono"  lenght='30'>
                        <option value="Mensual">Mensual</option>
                        <option value="Anual">Anual</option>
                        <option value="Premium">Premium</option>
                </select>          
                                 
                <div id = "newText"></div>    
                <div id = "Botom"className="newUserBoton" onClick={()=>ejecutaRegistro()}>Enviar</div>    

                <div className="flashcard">
                    <div className="demo">{newMessage} </div>
   	            </div>    

             

            </div>



        </div>
    )
}

export default connect()(Register);