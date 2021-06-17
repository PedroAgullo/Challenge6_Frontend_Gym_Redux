//Nos muestra las clases activas a las que está apuntado el usuario.

import React, { useEffect, useState } from "react";
import './DataJoin.css';
import axios from "axios";
import moment from "moment";
import { Popconfirm, message, Button } from 'antd';
import { connect } from 'react-redux';






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
        message.info('Clase reservada.');

      let token = localStorage.getItem('token');
      let idUser = localStorage.getItem('idUser');
        console.log(token, "<<<<==== token");
        console.log(idUser, "<<<====ID user");
        console.log(roomId, "<<<<==== ROOM id");

      let body = {
        id : roomId,
        member : idUser
      }

      let res = await axios.post('http://localhost:3005/room/join',body,{headers:{'authorization':'Bearer ' + token}});

      console.log(res.data, "Datos devueltos de axios");
      
      setTimeout(()=> {
        setUseroom(res.data);
        console.log(res.data, "<<<====Res.data");
        }, 750);

     }catch (err){
         console.log(err.message);      
         }      

    }

    //Encuentra todas las clases activas que puede reserver un user.
    const findAllRoomsAllActive = async () => {  
    try{
      //GET ALL USER ADMIN
      let res = await axios.get('http://localhost:3005/room/active');
      console.log(res.data, "Datos devueltos de axios");

 
 
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
      );
    } else {
      return <div>CARGANDO DATOS</div>;
    }
};


export default connect((state) => ({
  credentials:state.credentials, 
  getroomusers:state.getroomusers
  }))(DataJoin);


