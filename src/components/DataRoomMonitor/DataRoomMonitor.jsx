//Nos muestra las clases activas a las que está apuntado el usuario.
import React, { useEffect, useState } from "react";
import './DataRoomMonitor.css';
import axios from "axios";
import moment from "moment";
import { Popconfirm, message, Button } from 'antd';
import { connect } from 'react-redux';
import { GETROOMMONITOR } from '../../redux/types';



const DataRoomMonitor = (props) => {

    //hooks
    const [useroom, setUseroom] = useState([]);  
  
    //Equivalente a componentDidMount en componentes de clase (este se ejecuta solo una vez)
    useEffect(() => {
      findAllRoomsActive();
    }, []);
  
    //Equivalente a componentDidUpdate en componentes de clase
    useEffect(() => {
      //setUseroom(props.getroomusers);
    });
  
    //CANCELA LA CLASE
    const cancelClass = async (roomId) => {
      try{
        message.info('Clase cancelada.');

      let token = props.credentials.token;
      let idUser = props.credentials.idUser;
        console.log(token, "<<<<==== token");
        console.log(idUser, "<<<====ID user");
        console.log(roomId, "<<<<==== ROOM id");

      let body = {
        id : roomId,
        member : idUser
      }

      let res = await axios.post('http://localhost:3005/room/leave/coach',body,{headers:{'authorization':'Bearer ' + token}});

      console.log(res.data, "Datos devueltos de axios");

      findAllRoomsActive();
     }catch (err){
         console.log(err);      
         }      

    }
  
    const findAllRoomsActive = async () => {

  
    try{

      let idUser = props.credentials.idUser;
      let token = props.credentials.token;
    
      let body = {
        id : idUser
      }

      //GET ALL USER ADMIN
      let res = await axios.post('http://localhost:3005/room/monitorid',body,{headers:{'authorization':'Bearer ' + token}});

      console.log(res.data, "Datos devueltos de axios");

      props.dispatch({type:GETROOMMONITOR,payload: res.data});

      setUseroom(res.data);
 
  }catch (err){      
  }
  
}
  

  if (props.getroommonitor[0]?._id) {
    // if (useroom[0]?._id) {

      return (
        <div className="nombreDataRoomMonitor"> <h1>Tus próximas clases</h1>
            <div className="boxCardDataRoomMonitor">
              {useroom.map((act, index) => (
                <div className="cardDataRoomMonitor" key={index}>
                  <p className="nombre">{act.name}</p>
                  <p className="datosCardRoomMonitor">Comienzo: {moment(act.dateStart).format('LLL')}</p>
                  <p className="datosCardRoomMonitor">Fin: {moment(act.dateEnd).format('LLL')}</p>
                  <p className="datosCardRoomMonitor">Entrenador: {act.nameCoach}</p>
                  <p className="datosCardRoomMonitor">Capacidad: {act.members.length}/{act.maxMember}</p>
                  <div clasName="botonCardJoinUser">
                        <div className="demo">


                            <div style={{ marginLeft: 0, clear: 'both', whiteSpace: 'nowrap' }}>
                                    
                              <Popconfirm placement="bottom" title="¿Quieres cancelar esta clase?" onConfirm={()=>cancelClass(act._id)} okText="Yes" cancelText="No">
                                <Button>Cancelar</Button>
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
  }))(DataRoomMonitor);
