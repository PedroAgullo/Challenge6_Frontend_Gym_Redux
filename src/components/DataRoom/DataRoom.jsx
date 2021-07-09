
//Nos muestra las clases activas a las que está apuntado el usuario.
import React, { useEffect, useState } from "react";
import './DataRoom.css';
import axios from "axios";
import moment from "moment";
import { Popconfirm, message, Button } from 'antd';
import { connect } from 'react-redux';
import { GETROOMUSER } from '../../redux/types';
import CustomSpinner from '../../components/Spin/Spin'
import {Input, notification} from 'antd';




const DataRoom = (props) => {



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


      let body = {
        id : roomId,
        member : idUser
      }

      let res = await axios.post('https://xsmilegymback.herokuapp.com/room/leave',body,{headers:{'authorization':'Bearer ' + token}});

    

      findAllRoomsActive();
     }catch (err){
        notification.warning({message:'Atencion.',description: JSON.stringify(err.response.data.message)});
        


         }      

    }
  
    const findAllRoomsActive = async () => {

  
    try{

      let idUser = props.credentials.idUser;
      let token = props.credentials.token;
    
      let body = {
        member : idUser
      }

      let res = await axios.post('https://xsmilegymback.herokuapp.com/room/userid',body,{headers:{'authorization':'Bearer ' + token}});
     

      props.dispatch({type:GETROOMUSER,payload: res.data});

      setTimeout(() => {
        setUseroom(res.data);;
      }, 0)
  
     
 
  }catch (err){      
    notification.warning({message:'Atencion.',description: JSON.stringify(err.response.data.message)});
  }
  
}
  // if (useroom.length === 0){
  //   return(
  //       <div>NO TIENES CLASES</div>
  //   )
   if (props.getroomusers[0]?._id) {
      return (
        <div className="nombreDataRoom"> <h1>Tus próximas clases</h1>


            <div className="boxCardDataRoom">
              {useroom.map((act, index) => (
                <div className="card" key={index}>
                  <p className="nombre">{act.name}</p>
                  <p className="datosCard">Comienzo: {moment(act.dateStart).format('LLL')}</p>
                  <p className="datosCard">Fin: {moment(act.dateEnd).format('LLL')}</p>
                  <p className="datosCard">Entrenador: {act.nameCoach}</p>
                  <p className="datosCard">Capacidad: {act.members.length}/{act.maxMember}</p>
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
      return <div>
     {/*    <div className="spinner">

      
      <CustomSpinner/>
      </div>

      <div className="nombreDataRoom">No tienes ninguna clase registrada.</div>

           */}

          
        </div>        

    }
};

export default connect((state) => ({
  credentials:state.credentials, 
  getroomusers:state.getroomusers
  }))(DataRoom);
