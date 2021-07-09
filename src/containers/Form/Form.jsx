import React, {useState} from 'react';
import "./Form.css";
import axios from 'axios';
import {useHistory} from "react-router";
import {connect} from 'react-redux';
import 'antd/dist/antd.css';
import { Rate } from 'antd';


const Form = () => {
    let history = useHistory();

    //Hooks
    const [datosUser, setDatosUser] = useState([])

    const [useroom, setUseroom] = useState([])
 

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

        }
    }

    const enviarReseña = async () => {
        

        let  review = {
            id: "", 
            userId : "" ,
            texto: "",
            rating: ""
        }

        /* var  array = Object.entries(review);
        var num = array.length;

        for (let x = 0; x < num; x++){
            if(array[x][1] === ''){
                let campoVacio = ("El campo " + array[x][0] + " no puede estar vacío.");
                return setNewMessage(campoVacio);
            }

        } */


         axios.post(("http://localhost:3005/monitor/addmessage"), review)        
        .then(res => {
            setNewMessage("Gracias por participar.");

            setTimeout(()=> {
                history.push('/');
            }, 5000);     
        }).catch(err => {
           
           
            
        });     
      
   
    }    

    return (
        <div className= "boxFormReview">
            <h1 className= "tituloFormRegistro"> Reseña </h1>
            <div className="formulario">
                <input className="inputBaseReseñaSmall" type="text" name="name" onChange={updateFormulario} onBlur={()=>checkError("name")} placeholder="Nombre" size="34" lenght='30'></input>
                <div>{errors.eName}</div>

                <input className="inputBaseReseñaSmall" type="text" name="email" onChange={updateFormulario} onBlur={()=>checkError("email")} placeholder="Email" size="34" lenght='30'></input>
                <div>{errors.eEmail}</div>
                
                <input className="inputBaseReseña" type="text" name="Clase" onChange={updateFormulario}  placeholder="Cuentanos que te pareció la clase" size="50" lenght='100'></input>
               
                <div id = "newTextRate"><Rate /></div> 

                <input className="inputBaseReseña" type="text" name="Coach" onChange={updateFormulario}  placeholder="Cuentanos que te pareció la clase :" size="50" lenght='100'></input>
          
                                 
                <div id = "newTextRate"><Rate /></div>    
                <div id = "Botom"className="newUserBoton" onClick={()=>enviarReseña()}>Enviar</div>    

                <div className="flashcard">
                    <div className="demo">{newMessage} </div>
   	            </div>    

             

            </div>



        </div>
    )
}

export default connect()(Form);