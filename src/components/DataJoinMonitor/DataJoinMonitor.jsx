//Nos muestra las clases activas a las que está apuntado el usuario.

import React, { useEffect, useState } from "react";
import './DataJoinMonitor.css';
import axios from "axios";
import moment from "moment";
import { Popconfirm, message, Button } from 'antd';
import { connect } from 'react-redux';
import CustomSpinner from '../../components/Spin/Spin';
import {Input, notification} from 'antd';

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

      let token = props.credentials.token;
      let idCoach = props.credentials.user._id;
      let name = props.credentials.user.name

      let body = {
        id : roomId,
        coach : idCoach,
        nameCoach : name         
      }


      let res = await axios.post('http://localhost:3005/room/join/coach',body,{headers:{'authorization':'Bearer ' + token}});
      message.info('Clase reservada.');

      findAllRoomsAllActiveMonitor();
 

     }catch (err){
        notification.warning({message:'Atencion.',description: JSON.stringify(err.response.data.message)});              
         }     

    }

    //Encuentra todas las clases activas que puede reservar un monitor.
    const findAllRoomsAllActiveMonitor = async () => {  
    try{
      //GET ALL USER ADMIN
      let res = await axios.get('http://localhost:3005/room/active');
      
        let prueba = [];
        
        prueba = res.data;

        let num = res.data.length;

        let noCoach = [];

        
        for(let x=0; x < num; x++){

            if (res?.data[x]?.coaches[0] === undefined){
                noCoach.push(res.data[x]);
            }

        }
        
        setUseroom(noCoach);
 

  }catch (err){
    notification.warning({message:'Atencion.',description: JSON.stringify(err.response.data.message)});
  }
  
}
  
if (useroom[0]?._id) {
  return (
        <div className="titleDataJoinMonitor"> <h1>Reserva una clase</h1>
            <div className="boxCardJoinMonitor">
              {useroom.map((act, index) => (
                <div className="cardJoinMonitor" key={index} >
                    <p className="nombreJoinUser">{act.name}</p>
                    <p className="datosCardJoinMonitor">Comienzo: {moment(act.dateStart).format('LLL')}</p>
                    <p className="datosCardJoinMonitor">Fin: {moment(act.dateEnd).format('LLL')}</p>
                    <p className="datosCardJoinMonitor">Entrenador: {act.nameCoach}</p>
                    <p className="datosCardJoinMonitor">Capacidad: {act.members.length}/{act.maxMember}</p>
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
      return <div>
      <div className="spinner">

    
    <CustomSpinner/>
    </div>

    <div className="nombreDataRoom">No tienes ninguna clase registrada.</div>

        

        
      </div>   
    }
};


export default connect((state) => ({
  credentials:state.credentials, 
  getroommonitor:state.getroommonitor
  }))(DataJoinMonitor);


