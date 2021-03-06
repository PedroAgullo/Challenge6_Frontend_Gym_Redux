import React from 'react';
import "./HomePrice.css";
import TarifaMensual from '../../images/mensual.jpg';
import TarifaAnual from '../../images/anual.jpg';
import TarifaPremium from '../../images/premium.png';

const HomePrice = (props) => {

    return (
      
        <div >
            <div>
                <h1 className="titleHomeText">ELIGE TU PLAN</h1>
            </div>
            <div className="RoomHomeTarifa">
                <div className="cardHomeTarifa" >
                    <img className = "tarifa" src={TarifaMensual} alt="tarifa mensual" />
{/*                     <div className="titleRoomTarifaCard" src={TarifaMensual}><h2>MENSUAL</h2></div>
                    <div className="textCardTarifa"><li>Acceso a todas las actividades.</li></div>
                    <div className="textCardTarifa"><li>Reservas 24hs antes.</li></div>
                    <div className="textCardTarifa"><li>Descuentos en comercios adheridos.</li></div> */}
                </div>
                <div className="cardHomeTarifa">
                <img className = "tarifa" src={TarifaAnual} alt="tarifa anual" />
{/*                     <div className="titleRoomTarifaCard"><h2>ANUAL</h2></div>
                    <div className="textCardTarifa"><li>Acceso a todas las actividades.</li></div>
                    <div className="textCardTarifa"><li>Reservas 48hs antes.</li></div>
                    <div className="textCardTarifa"><li>Descuentos en comercios adheridos.</li></div>
                    <div className="textCardTarifa"><li>Parking 50% de descuento.</li></div>
                    <div className="textCardTarifa"><li>Taquillas pequeñas gratis.</li></div>
                    <div className="textCardTarifa"><li>Descuentos en las master class mensuales.</li></div> */}
                </div>
                <div className="cardHomeTarifa">
                <img className = "tarifa" src={TarifaPremium} alt="tarifa premium" />
{/*                     <div className="titleRoomTarifaCard"><h2>PREMIUM</h2></div>
                    <div className="textCardTarifa"><li>Acceso a todas las actividades.</li></div>
                    <div className="textCardTarifa"><li>Reservas 72hs antes.</li></div>
                    <div className="textCardTarifa"><li>Descuentos en comercios adheridos.</li></div>
                    <div className="textCardTarifa"><li>Parking gratis.</li></div>
                    <div className="textCardTarifa"><li>Taquillas grandes gratis.</li></div>
                    <div className="textCardTarifa"><li>Taquillas grandes gratis.</li></div>
                    <div className="textCardTarifa"><li>Invitacion gratis a una master class mensual.</li></div> */}
                </div>
            </div>
            <div>
                <div className="blank"></div>
            </div>
         
        </div>

 
    );
  };
  export default HomePrice;