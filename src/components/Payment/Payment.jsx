import React from 'react';
import "./Payment.css";
import TarifaMensual from '../../images/mensual.jpg';
import TarifaAnual from '../../images/anual.jpg';
import TarifaPremium from '../../images/premium.png';

const Payment = (props) => {

    return (
      
        <div >
            <div>
                <h1 className="titleHomeText">ELIGE TU PLAN</h1>
            </div>
            <div className="RoomHomeTarifa">
                <div className="cardHomeTarifa" >
                    <img className = "tarifaPayment" src={TarifaMensual} alt="tarifa mensual" />

                </div>
                <div className="cardHomeTarifa">
                <img className = "tarifaPayment" src={TarifaAnual} alt="tarifa anual" />

                </div>
                <div className="cardHomeTarifa">
                <img className = "tarifaPayment" src={TarifaPremium} alt="tarifa premium" />

                </div>
            </div>
            <div>
                <div className="blank"></div>
            </div>
         
        </div>

 
    );
  };
  export default Payment;