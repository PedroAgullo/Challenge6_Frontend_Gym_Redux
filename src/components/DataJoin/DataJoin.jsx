//Nos muestra las clases activas a las que está apuntado el usuario.

import React, { useEffect, useState } from "react";
import './DataJoin.css';
import axios from "axios";
import moment from "moment";
import { Popconfirm, message, Button } from 'antd';
import { connect } from 'react-redux';
import { NEWROOM, EDITROOM } from '../../redux/types';
import {Input, notification} from 'antd';






const DataJoin = (props) => {

    //hooks
    const [useroom, setUseroom] = useState([]);
  
    //Equivalente a componentDidMount en componentes de clase (este se ejecuta solo una vez)
    useEffect(() => {
      findAllRoomsAllActive();  
    }, []);
  
    //Equivalente a componentDidUpdate en componentes de clase
    useEffect(() => {
    });
  
    //  

    const joinClass = async (roomId) => {
      try{

      let token = props.credentials.token;
      let idUser = props.credentials.idUser;


      let body = {
        id : roomId,
        member : idUser,
        email : props.credentials.email,
        name : props.credentials.name
      }
      
      let res = await axios.post('http://localhost:3005/room/join',body,{headers:{'authorization':'Bearer ' + token}});
      message.info('Clase reservada.');
      findAllRoomsAllActive();

     }catch (err){
      notification.warning({message:'Atencion.',description: JSON.stringify(err.response.data.message)});
      }      
    }


    const cancelClass = async (roomId) => {
      try{

      let token = props.credentials?.token;
      let user = props.credentials?.idUser

      let body = {
        id : roomId     
      }

      let resul = await axios.post('http://localhost:3005/room/delete', body,{headers:{'authorization':'Bearer ' + token}});

      message.info('Clase cancelada.')
      findAllRoomsAllActive();
     
   

     }catch (err){
        notification.warning({message:'Atencion.',description: JSON.stringify(err.response.data.message)});
    }      

    }


    const updateClass = async (room) => {
      //Traemos todos los monitores
      let token = props.credentials?.token;
      let monitors = await axios.get('http://localhost:3005/monitor', {headers:{'authorization':'Bearer ' + token}});

      // Traemos los usuarios de la clase
      let arrayUser = room.members;
      let users = await axios.post('http://localhost:3005/user/group',arrayUser, {headers:{'authorization':'Bearer ' + token}});



      
      //Guardamos en Redux
      let datos = {
        room : room,
        users : users.data,
        monitors : monitors.data
      }



      props.dispatch({type:EDITROOM,payload:datos});
      props.dispatch({ type: NEWROOM, payload: "newroom" });      

    }

    //Encuentra todas las clases activas que puede reserver un user.
    const findAllRoomsAllActive = async () => {  
    try{

      let res = await axios.get('http://localhost:3005/room/active');
      setUseroom(res.data);
 

  }catch (err){
    notification.warning({message:'Atencion.',description: JSON.stringify(err.response.data.message)});
  }
  
}
  if(props.credentials.user.isAdmin === false)  {
    if (useroom[0]?._id) {
      return (
        <div className="titleDataJoinUser"> <h1>Reserva una clase</h1>
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
                                    
                              <Popconfirm placement="bottom" title="¿Quieres reservar esta clase?" onConfirm={()=>joinClass(act._id)} okText="Yes" cancelText="No">
                                <Button>Reservar</Button>
                              </Popconfirm>

                            </div>
                        </div>
                    </div>
                 </div>
              ))}
            </div>
        </div>  
      )   
    } else {     
      return <div>CARGANDO DATOS</div>;
    }
  }else if (props.credentials.user.isAdmin === true) {
      if (useroom[0]?._id) {
        return (
          <div className="titleDataJoinUser"> <h1>Reserva una clase</h1>
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
                                      
                              <Popconfirm placement="bottomLeft" title="¿Quieres cancelar esta clase?" onConfirm={()=>cancelClass(act._id)} okText="Yes" cancelText="No">
                                  <Button>Cancelar</Button>
                                </Popconfirm>

                                <Popconfirm placement="bottom" title="¿Quieres reservar esta clase?" onConfirm={()=>joinClass(act._id)} okText="Yes" cancelText="No">
                                  <Button>Reservar</Button>
                                </Popconfirm>

                                <Popconfirm placement="bottomRight" title="¿Quieres modicar esta clase?" onConfirm={()=>updateClass(act)} okText="Yes" cancelText="No">
                                  <Button>Modificar</Button>
                                </Popconfirm>


  
                              </div>
                          </div>
                      </div>
                   </div>
                ))}
              </div>
          </div>  
        )   
      } else {     
        return <div>


        </div>;
      }    
  }
}

export default connect((state) => ({
  credentials:state.credentials, 
  getroomusers:state.getroomusers
  }))(DataJoin);