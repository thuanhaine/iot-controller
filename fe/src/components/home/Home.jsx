import './Home.scss'
import { useState } from 'react'
import {FaTemperatureLow} from "react-icons/fa"
import {WiHumidity} from "react-icons/wi"
import {HiLightBulb} from "react-icons/hi"
import {SiToggl } from "react-icons/si"

function Home() {
    const [value, setValue] = useState(122)
    const [isLight, setIsLight] = useState(true)
    const [min, seMin] = useState(37)
    const [max, setMax] = useState(38)
    const changeColor = () => {
        if(value > 0)
             setValue(value - 2)
    }

    const [nhietdo, setNhietdo] = useState(0)
    const [doam, setDoam] = useState(3)
    return(
        <>
        <div className="home">
            {/* <div className="container" style={{backgroundColor : `hsl(${value}, 100%, 78%)`}} >
                <button onClick={changeColor}>change</button>
            </div> */}
            <div className="container" style={{backgroundColor : `hsl(${value}, 100%, 78%)`}} onClick={changeColor}>
                <h3 className='title'>Controller</h3>
                <HiLightBulb className="icon-light" style={{color: `${isLight ? 'db8300' : 'gray'}` }}/>
                <div className="screen">
                    <div className="left">
                        <div className='text'><FaTemperatureLow className='color-red'/> <h2>{nhietdo} °C</h2> </div>
                    </div>
                    <div className="right">
                         <div className='text'>  <h2>{doam} %</h2> <WiHumidity className='color-blue'/></div>
                    </div>
                </div>
                <div className="properties">
                         <h2 className='text'>Max: {max} °C</h2>
                         <h2 className='text'>Min: {min} °C</h2>
                </div>
                <div className='active'>
                     <SiToggl className='active-btn' style={{color : `${isLight ? 'db8300' : 'gray'}` }} onClick={() => setIsLight(!isLight) }/> 
                </div>
            </div>
        </div>
        </>
    )
}

export default Home



// page controller chỉ bật tắt đc đèn và xem thông số
// page manage có thêm chức năng chỉnh nhiệt độ
// thêm được xem báo cáo (bảng hiển thị thông số hiện tại, lịch sử, thời gian sáng )