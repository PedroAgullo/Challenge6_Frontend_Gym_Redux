//Nos muestra las clases activas a las que está apuntado el usuario.

import React, { useEffect, useState } from "react";
import './DataJoinMonitor.css';
import axios from "axios";
import moment from "moment";
import { Popconfirm, message, Button } from 'antd';
import { connect } from 'react-redux';




const DataJoinMonitor = (props) => {

    //hooks
    const [useroom, setUseroom] = useState([]);
  
    //Equivalente a componentDidMount en componentes de clase (este se ejecuta solo una vez)
    useEffect(() => {
        findAllRoomsAllActiveMonitor();  
    }, []);
  
    //Equivalente a componentDidUpdate en componentes de clase
    useEffect(() => {
    });
  
    //  

    const joinClassMonitor = async (roomId) => {
      try{

        message.info('Clase reservada.');
        
      let token = props.credentials.token;
      let idCoach = props.credentials.user._id;
      let name = props.credentials.user.name
      
      console.log(token, "<<<<==== token");
        console.log(idCoach, "<<<====ID user");
        console.log(roomId, "<<<<==== ROOM id");
        console.log(props.credentials.user.name, "Nombre del coach");
            

      let body = {
        id : roomId,
        coach : idCoach,
        nameCoach : name         
      }
      


  


      let res = await axios.post('http://localhost:3005/room/join/coach',body,{headers:{'authorization':'Bearer ' + token}});

      console.log(res.data, "Datos devueltos de axios");
      findAllRoomsAllActiveMonitor();
 

     }catch (err){
         console.log(err.message);      
         }      

    }

    //Encuentra todas las clases activas que puede reserver un user.
    const findAllRoomsAllActiveMonitor = async () => {  
    try{
      //GET ALL USER ADMIN
      let res = await axios.get('http://localhost:3005/room/active');
      console.log(res.data, "Datos devueltos de axios");
        let prueba = [];
        prueba = res.data;


        let num = prueba.lenght;
        console.log(num);

        let noCoach = [];

        console.log(res.data[7].nameCoach[0], "<<<=== res.data[0]");
        for(let x=0; x < num; x++){

            if (res.data[x].nameCoach[0] === ''){

                noCoach.push(res.data[x]);
            }

        }
        console.log(noCoach);
        setUseroom(res.data);
 

  }catch (err){
      
  }
  
}
  
if (useroom[0]?._id) {
  return (
        <div> <h1>Reserva una clase</h1>
            <div className="boxCardJoinUser">
              {useroom.map((act, index) => (
                <div className="cardJoinUser" key={index} >
                    <p className="nombreJoinUser">{act.name}</p>
                    <p className="datosCardJoinUser">Comienzo: {moment(act.dateStart).format('LLL')}</p>
                    <p className="datosCardJoinUser">Fin: {moment(act.dateEnd).format('LLL')}</p>
                    <p className="datosCardJoinUser">Entrenador: {act.nameCoach}</p>
                    <p className="datosCardJoinUser">Capacidad: {act.members.length}/{act.maxMember}</p>
                    <div clasName="botonCardJoinUser">
                        <div className="demo">

                            <div style={{ marginLeft: 0, clear: 'both', whiteSpace: 'nowrap' }}>
                                    
                              <Popconfirm placement="bottom" title="¿Quieres reservar esta clase?" onConfirm={()=>joinClassMonitor(act._id)} okText="Yes" cancelText="No">
                                <Button>Reservar</Button>
                              </Popconfirm>

                            </div>
                        </div>
                    </div>
                 </div>
              ))}
            </div>
        </div>  
      );
    } else {
      return <div>CARGANDO DATOS</div>;
    }
};


export default connect((state) => ({
  credentials:state.credentials, 
  getroommonitor:state.getroommonitor
  }))(DataJoinMonitor);


