
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { JOIN, CLASES, PROFILE } from '../../redux/types';
import moment from 'moment';
import { Popconfirm, message, Button } from 'antd';
import Useroom from'../../components/Useroom/Useroom';
import Userdata from '../../components/Userdata/Userdata';



const MenuUser = (props) => {

        //hooks
        const [useroom, setUseroom] = useState(props.tipodatos);
        
        

  
        //Equivalente a componentDidMount en componentes de clase (este se ejecuta solo una vez)
        useEffect(() => {
            setUseroom('Perfil');
      
        }, []);
      
        // Equivalente a componentDidUpdate en componentes de clase
        useEffect(() => {
            }
           
        );


        // if (useroom != ''){
        //     switch(useroom){
        //         case "perfil":
        //             console.log("Estoy en el case de useEffect con perfil.")
        //         return    
                       
        //             <div>



        //             </div>
        //         break;
        //     }




    // switch(props?.tipoDatos){
        
    //     case "perfil" : 
    //         console.log ("Entro en case perfil de menuuser");
    //         setUseroom("perfil");
    //     break;
     


    //     case "clases":
    //         return (
    //             <div> <h1>TUS PRÓXIMAS CLASES</h1>
    //                 <div className="boxCard">
    //                   {props.getroomusers.room.map((act, index) => (
    //                     <div className="card" key={index}>
    //                       <p className="nombre">{act.name}</p>
    //                       <p className="datosCard">Comienzo: {moment(act.dateStart).format('LLL')}</p>
    //                       <p className="datosCard">Fin: {moment(act.dateEnd).format('LLL')}</p>
    //                       <p className="datosCard">Entrenador: {act.nameCoach}</p>
    //                       <p className="datosCard">Capacidad: {act.members.length}/{act.maxMember}</p>
    //                       <div clasName="botonCardJoinUser">
    //                             <div className="demo">
        
        
    //                                 {/* <div style={{ marginLeft: 0, clear: 'both', whiteSpace: 'nowrap' }}>
                                            
    //                                   <Popconfirm placement="bottom" title="¿Quieres cancelar esta clase?" onConfirm={()=>cancelClass(act._id)} okText="Yes" cancelText="No">
    //                                     <Button>Cancelar</Button>
    //                                   </Popconfirm>
        
    //                                 </div> */}
    //                             </div>
    //                         </div>
    //                     </div>
    //                        ))}
        
    //                 </div>
    //             </div>  
    //           );
         
    //     break;





    // }

    if (useroom == 'perfil'){
       /*  console.log("Estoy en el if de userroom"); */
                    return    
                           
                        <div>
                            PROBANDO
                          <Userdata/>
                        </div>


    }else {
    return (
        <div>
                                      <Userdata/>

            ESTO ES LO MÁS DIFICIL DEL BOOTCAMP O NO? PINTANDO ESTO
        </div>
    )
    }
}


export default connect((state)=>({
    credentials:state.credentials,
    tipodatos: state.tipodatos
}))(MenuUser);