import React from "react";
import "./Payment.css";
import TarifaMensual from "../../images/mensual.jpg";
import TarifaAnual from "../../images/anual.jpg";
import TarifaPremium from "../../images/premium.png";
import { Popconfirm, message, Button } from "antd";
import {connect} from 'react-redux';
import axios from 'axios';
import {Input, notification} from 'antd';


const Payment =  (props) => {


  const updatePayment = async (opc) => {
     let token = props.credentials.token;

    switch (opc){
      case 1: 

      let body = {
        id : props.credentials.user._id,
        member : props.credentials.user._id,
        subscription: "Mensual"        
    }

        let res = await axios.post('http://localhost:3005/user/payment',body,{headers:{'authorization':'Bearer ' + token}});
        notification.success({message:'Cambiado correctamente.',description: "Tu nueva susbcripción es Mensual."});

       
      break;

      case 2: 

      let body2 = {
        id : props.credentials.user._id,
        member : props.credentials.user._id,
        subscription: "Anual"        
    }
  

        let res2 = await axios.post('http://localhost:3005/user/payment',body2,{headers:{'authorization':'Bearer ' + token}});
        notification.success({message:'Cambiado correctamente.',description: "Tu nueva susbcripción es Anual."});

      break;


      case 3 : 
        let body3 = {
        id : props.credentials.user._id,
        member : props.credentials.user._id,
        subscription: "Premium"        
       }

        let res3 = await axios.post('http://localhost:3005/user/payment',body3,{headers:{'authorization':'Bearer ' + token}});
        notification.success({message:'Cambiado correctamente.',description: "Tu nueva susbcripción es Premium."});

      break;

      default :

      break;
    }

  }

  return (
    <div>
      <div className="titlePaymentText">
        <h1>Elige tu plan</h1>
      </div>
      <div className="RoomHomePayment">
        <div className="cardHomeTarifa">
          <img
            className="tarifaPayment"
            src={TarifaMensual}
            alt="tarifa mensual"
          />
        </div>
        <div className="cardHomeTarifa">
          <img className="tarifaPayment" src={TarifaAnual} alt="tarifa anual" />
        </div>
        <div className="cardHomeTarifa">
          <img
            className="tarifaPayment"
            src={TarifaPremium}
            alt="tarifa premium"
          />
        </div>
      </div>
      <div>
        <div className="RoomHomeTarifaBoton">
          <div className="botonSeleccionarTarifa">
            <div clasName="botonCardJoinUser">
              <div className="demo">
                <div
                  style={{ marginLeft: 0, clear: "both", whiteSpace: "nowrap" }}
                >
                  <Popconfirm
                    onConfirm={()=>updatePayment(1)}

                    placement="bottom"
                    title="¿Quieres confirmar esta suscripción Mensual?"
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button>Seleccionar</Button>
                  </Popconfirm>
                </div>
              </div>
            </div>
          </div>

          <div className="botonSeleccionarTarifa">
            <div clasName="botonCardJoinUser">
              <div className="demo">
                <div
                  style={{ marginLeft: 0, clear: "both", whiteSpace: "nowrap" }}
                >
                  <Popconfirm
                    onConfirm={()=>updatePayment(2)}
                    placement="bottom"
                    title="¿Quieres confirmar esta suscripción Anual?"
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button>Seleccionar</Button>
                  </Popconfirm>
                </div>
              </div>
            </div>
          </div>

          <div className="botonSeleccionarTarifa">
            <div clasName="botonCardJoinUser">
              <div className="demo">
                <div
                  style={{ marginLeft: 0, clear: "both", whiteSpace: "nowrap" }}
                >
                  <Popconfirm
                   onConfirm={()=>updatePayment(3)}
                    placement="bottom"
                    title="¿Quieres confirmar esta suscripción Mensual Premium?"
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button>Seleccionar</Button>
                  </Popconfirm>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="blankTarifa"></div>
      </div>

    </div>
  );
};
export default connect((state) => ({
  credentials:state.credentials
  }))(Payment);
