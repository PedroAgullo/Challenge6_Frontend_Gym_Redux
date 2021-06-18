import React from "react";
import "./Payment.css";
import TarifaMensual from "../../images/mensual.jpg";
import TarifaAnual from "../../images/anual.jpg";
import TarifaPremium from "../../images/premium.png";
import { Popconfirm, message, Button } from "antd";

const Payment = (props) => {
  return (
    <div>
      <div className="titlePaymentText">
        <h1>Elige tu plan</h1>
      </div>
      <div className="RoomHomeTarifa">
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
export default Payment;
