import { useState } from "react";
import "./Manage_User.scss";
import { FaTemperatureLow, FaRegSave } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { HiLightBulb } from "react-icons/hi";
import { SiToggl } from "react-icons/si";
import { FiEdit } from "react-icons/fi";

function Manage_User() {
  const [value, setValue] = useState(122);
  const [isLight, setIsLight] = useState(true);
  const [min, setMin] = useState(37);
  const [max, setMax] = useState(38);
  const [changeTemp, setTemp] = useState(false);
  const changeColor = () => {
    if (value > 0) setValue(value - 2);
  };

  const [nhietdo, setNhietdo] = useState(0);
  const [doam, setDoam] = useState(3);

  const handleChangetemp = () => {
    if (min <= max) {
      setTemp(false);
      alert("Change Successfully");
    } else {
      alert("Value of Min much to less than Max ");
    }
  };
  return (
    <>
      <div className="manage">
        {/* <div className="container" style={{backgroundColor : `hsl(${value}, 100%, 78%)`}} >
                <button onClick={changeColor}>change</button>
            </div> */}
        <div
          className="container"
          style={{ backgroundColor: `hsl(${value}, 100%, 78%)` }}
          onClick={changeColor}
        >
          <h3 className="title">Controller</h3>
          <HiLightBulb
            className="icon-light"
            style={{ color: `${isLight ? "db8300" : "gray"}` }}
          />
          <div className="screen">
            <div className="left">
              <div className="text">
                <FaTemperatureLow className="color-red" /> <h2>{nhietdo} °C</h2>{" "}
              </div>
            </div>
            <div className="right">
              <div className="text">
                {" "}
                <h2>{doam} %</h2> <WiHumidity className="color-blue" />
              </div>
            </div>
          </div>
          <div className="properties">
            <div className="item">
              <strong>Max:</strong>
              {changeTemp ? (
                <input
                  type="text"
                  className="input"
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                />
              ) : (
                <span> {max} </span>
              )}
              <strong>°C</strong>
            </div>
            <div className="item">
              <strong>Min:</strong>
              {changeTemp ? (
                <input
                  type="text"
                  className="input"
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                />
              ) : (
                <span> {min} </span>
              )}
              <strong>°C</strong>
            </div>
            {changeTemp ? (
              <FaRegSave className="icon" onClick={handleChangetemp} />
            ) : (
              <FiEdit className="icon" onClick={() => setTemp(true)} />
            )}
          </div>
          <div className="active">
            <SiToggl
              className="active-btn"
              style={{ color: `${isLight ? "db8300" : "gray"}` }}
              onClick={() => {
                setIsLight(!isLight);
                setTemp(false);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default Manage_User;
