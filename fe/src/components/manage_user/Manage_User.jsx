import { useEffect, useState } from "react";
import "./Manage_User.scss";
import { FaTemperatureLow, FaRegSave } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { HiLightBulb } from "react-icons/hi";
import { MdHdrAuto } from "react-icons/md";
import { SiToggl } from "react-icons/si";
import { FiEdit } from "react-icons/fi";
import { BsFan } from "react-icons/bs";
import { getDatabase, ref, onValue, get, child, set } from "firebase/database";
import { firebase } from "../home/Firebase";

function Manage_User() {
  const [value, setValue] = useState(122);
  const [changeTemp, setTemp] = useState(false);
  const [isLight, setIsLight] = useState(true);
  const [isFan, setIsFan] = useState(true);
  const [valueCheckTemp, setValueCheckTemp] = useState();
  const changeColor = () => {
    if (value > 0) setValue(value - 2);
  };

  useEffect(() => {
    const query = ref(firebase, "Device");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        console.log(data);
        setValue(data);
        setIsLight(data.light);
        setIsFan(data.blower);
      }
    });
  }, []);

  const handleChangeAuto = () => {
    const autoValue = ref(firebase, "Device/auto");

    get(autoValue).then((snapshot) => {
      const currentValue = snapshot.val();
      if (currentValue) {
        set(autoValue, !currentValue);
      } else {
        set(autoValue, !currentValue);
      }
    });
  };

  const handleChangeLight = () => {
    setTemp(false);
    const light = ref(firebase, "Device/light");
    get(light).then((snapshot) => {
      const currentValue = snapshot.val();
      if (currentValue) {
        set(light, false);
      } else {
        set(light, !currentValue);
      }
    });
  };

  const handleChangeBlower = () => {
    setTemp(false);
    const blower = ref(firebase, "Device/blower");
    get(blower).then((snapshot) => {
      const currentValue = snapshot.val();
      if (currentValue) {
        set(blower, false);
      } else {
        set(blower, !currentValue);
      }
    });
  };
  const handleSaveChecktemp = () => {
    setValueCheckTemp(value.checktemp);
    setTemp(!changeTemp);

    const checktemp = ref(firebase, "Device/checktemp");
    get(checktemp).then((snapshot) => {
      const currentValue = snapshot.val();
      if (valueCheckTemp) {
        set(checktemp, valueCheckTemp);
        setValue({ ...value, checktemp: valueCheckTemp });
      } else {
        set(checktemp, currentValue);
      }
    });
  };
  return (
    <>
      <div className="manage">
        <div
          className="container"
          style={{
            backgroundColor: `hsl(${450 - value.tempontime * 10}, 100%, 78%)`,
          }}
          onClick={changeColor}
        >
          <h3 className="title">Controller</h3>
          <HiLightBulb
            className="icon-light"
            style={{ color: `${value.light ? "db8300" : "gray"}` }}
          />
          <BsFan
            className="icon-fan"
            style={{ color: `${isFan ? "db8300" : "gray"}` }}
          />
          <div className="screen">
            <div className="left">
              <div className="text">
                <FaTemperatureLow className="color-red" />{" "}
                <h2>{value.tempontime} °C</h2>{" "}
              </div>
            </div>
            <div className="right">
              <div className="text">
                {" "}
                <h2>{value.hum} %</h2> <WiHumidity className="color-blue" />
              </div>
            </div>
          </div>
          <div className="properties">
            <h2>Check Temp: </h2>
            {changeTemp ? (
              <input
                type="text"
                className="input"
                value={changeTemp ? valueCheckTemp : value.checktemp}
                onChange={(e) => {
                  setValueCheckTemp(e.target.value);
                }}
              />
            ) : (
              <h2 className="text"> {value.checktemp} </h2>
            )}
            <strong> °C</strong>
            {changeTemp ? (
              <FaRegSave className="icon" onClick={handleSaveChecktemp} />
            ) : (
              <FiEdit
                className="icon"
                onClick={() => {
                  setTemp(!changeTemp);
                  setValueCheckTemp(value.checktemp);
                }}
              />
            )}
          </div>
          <div className="auto">
            <h2>Auto </h2>
            <MdHdrAuto
              className="icon-auto"
              style={{ color: `${value.auto ? "#5b6ffd" : "gray"}` }}
              onClick={handleChangeAuto}
            />
          </div>
          {value.auto ? (
            <></>
          ) : (
            <div className="active">
              <SiToggl
                className="active-btn"
                style={{ color: `${isLight ? "db8300" : "gray"}` }}
                onClick={handleChangeLight}
              />
              <BsFan
                className="active-btn"
                style={{ color: `${isFan ? "db8300" : "gray"}` }}
                onClick={handleChangeBlower}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default Manage_User;
