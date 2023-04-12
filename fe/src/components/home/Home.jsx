import "./Home.scss";
import { useEffect, useState } from "react";
import { FaTemperatureLow, FaFan } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { HiLightBulb } from "react-icons/hi";
import { SiLg, SiToggl } from "react-icons/si";
import { MdHdrAuto } from "react-icons/md";
import { BsFan } from "react-icons/bs";
import { getDatabase, ref, onValue, get, child, set } from "firebase/database";
import { firebase } from "./Firebase";

function Home() {
  const [value, setValue] = useState(122);
  const [isLight, setIsLight] = useState(true);
  const [isFan, setIsFan] = useState(true);
  const changeColor = () => {
    if (value > 0) setValue(value - 2);
  };

  // useEffect(() => {
  //   const query = ref(firebase, "Device");
  //   return onValue(query, (snapshot) => {
  //     const data = snapshot.val();
  //     if (snapshot.exists()) {
  //       console.log(data);
  //       setValue(data);
  //       setIsLight(data.light);
  //     }
  //   });
  // }, []);

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

  const autoRef = ref(firebase, "Device/auto");
  const toggleAuto = () => {
    get(autoRef).then((snapshot) => {
      const currentValue = snapshot.val();
      set(autoRef, !currentValue);
    });
  };

  // const handleChangeAuto = () => {
  //   const autoValue = ref(firebase, "Device/auto");

  //   get(autoValue).then((snapshot) => {
  //     const currentValue = snapshot.val();
  //     if (currentValue) {
  //       set(autoValue, !currentValue);
  //     } else {
  //       set(autoValue, !currentValue);
  //     }
  //   });
  // };

  const handleChangeLight = () => {
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

  return (
    <>
      <div className="home">
        {/* <div className="container" style={{backgroundColor : `hsl(${value}, 100%, 78%)`}} >
                <button onClick={changeColor}>change</button>
            </div> */}
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
            style={{ color: `${isLight ? "db8300" : "gray"}` }}
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
            <h2 className="text">Check Temp: {value.checktemp} °C</h2>
          </div>
          <div className="auto">
            <h2>Auto </h2>
            <MdHdrAuto
              className="icon-auto"
              style={{ color: `${value.auto ? "#5b6ffd" : "gray"}` }}
              // onClick={handleChangeAuto}
            />
          </div>
          {/* <div className="active">
            {value.auto ? (
              <></>
            ) : (
              <SiToggl
                className="active-btn"
                style={{ color: `${isLight ? "db8300" : "gray"}` }}
                onClick={handleChangeLight}
              />
            )}
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Home;

// page controller chỉ bật tắt đc đèn và xem thông số
// page manage có thêm chức năng chỉnh nhiệt độ
// thêm được xem báo cáo (bảng hiển thị thông số hiện tại, lịch sử, thời gian sáng )
