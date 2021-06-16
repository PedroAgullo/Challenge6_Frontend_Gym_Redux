
//Nos muestra las clases activas a las que está apuntado el usuario.
import React, { useEffect, useState } from "react";
import './DataRoom.css';
import axios from "axios";
import moment from "moment";
import { Popconfirm, message, Button } from 'antd';
import { connect } from 'react-redux';
import { GETROOMUSER } from '../../redux/types';



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

      let res = await axios.post('http://localhost:3005/room/leave',body,{headers:{'authorization':'Bearer ' + token}});

      console.log(res.data, "Datos devueltos de axios");

      
      setTimeout(()=> {
        setUseroom(res.data);
        console.log(res.data, "<<<====Res.data");
        }, 750);

     }catch (err){
         console.log(err);      
         }      

    }
  
    const findAllRoomsActive = async () => {

  
    try{

      // let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYzYyZTM1MGU2NWQ0MjUxOGY5YWY2YyIsImNyZWF0ZWRBdCI6IjIwMjEtMDYtMTZUMTY6Mzg6NTcuNTMyWiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2MjM4NjE1Mzd9.8PlZ2yOf0kzoP75l8vrmmH-3OpqOru-kXDoh_sKNsGg";
      // let idUser = "60c62e350e65d42518f9af6c";
      let idUser = props.credentials.idUser;
      let token = props.credentials.token;
    

      console.log(idUser);
      console.log(token);

      let body = {
        id : idUser
      }

      //GET ALL USER ADMIN
      let res = await axios.post('http://localhost:3005/room/userid',body,{headers:{'authorization':'Bearer ' + token}});
      console.log(res.data, "Datos devueltos de axios");

      props.dispatch({type:GETROOMUSER,payload: res.data});
      console.log(props.getroomusers, "Guardado de ");

      setUseroom(props.getroomusers);


let esperame=     await setTimeout(()=> {

    }, 1000);
    
 
  }catch (err){
      
  }
  
}
  
    if (props.getroomusers[0]?._id) {
      return (
        <div> <h1>TUS PRÓXIMAS CLASES</h1>
            <div className="boxCard">
              {props.getroomusers.map((act, index) => (
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
      return <div>CARGANDO DATOS</div>;
    }
};



export default connect((state) => ({
  credentials:state.credentials, 
  getroomusers:state.getroomusers
  }))(DataRoom);
