import { NavLink, useNavigate } from "react-router-dom";
import Logo from "./logo_chicken_xoaphong.jpg";
import { useState, useEffect } from "react";
import "./Register.scss";
import Loading from "../loading/Loading";

function Register() {
  const [inputName, setName] = useState("");
  const [inputPassword, setPassword] = useState("");
  const [inputPassword2, setPassword2] = useState("");
  const [inputEmail, setEmail] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleregister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (inputPassword == inputPassword2) {
      const data = {
        name: inputName,
        password: inputPassword,
        email: inputEmail,
      };

      fetch(`${process.env.REACT_APP_API}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((data) => data.json())
        .then((data) => {
          if (data.status === 200) {
            alert("Success");
            setIsLoading(false);
            navigate("/login", { replace: true });
          } else {
            if (data.status === 401) {
              setIsLoading(false);
              alert("Username đã tồn tại");
            }

            if (data.status === 402) {
              setIsLoading(false);
              alert("Email đã tồn tại");
            }
          }
        })
        .catch((err) => console.log(err.data));
    } else {
      alert("Xác nhận mật khẩu không đúng !");
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="register">
        <div className="register-left">
          <img src={Logo} className="register-left--logo" alt="Logo" />
          {isloading ? (
            <div className="register-loading">
              <Loading />
            </div>
          ) : (
            <></>
          )}

          <form onSubmit={handleregister}>
            <div className="register-content">
              <h1 className="register-title">Register account</h1>
              <div className="register-input-form">
                <span className="register-input-span"></span>
                <input
                  type="text"
                  value={inputName}
                  required
                  className="register-input-box"
                  placeholder="Username"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
              <div className="register-input-form">
                <span className="register-input-span"></span>
                <input
                  type="password"
                  value={inputPassword}
                  required
                  className="register-input-box"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              <div className="register-input-form">
                <span className="register-input-span"></span>
                <input
                  type="password"
                  value={inputPassword2}
                  required
                  className={
                    inputPassword == inputPassword2
                      ? "register-input-box"
                      : "register-input-box boder-red"
                  }
                  placeholder="Confirm Your Password"
                  onChange={(e) => setPassword2(e.target.value)}
                ></input>
              </div>
              <div className="register-input-form">
                <span className="register-input-span"></span>
                <input
                  type="email"
                  value={inputEmail}
                  required
                  className="register-input-box"
                  placeholder="Your email"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>

              <button className="btn-register">Register</button>
              <div className="text__forgot mr-16">
                <span className="text-forgotPW">
                  Have already an account?{" "}
                  <NavLink className="navLink" to="/login" onClick={this}>
                    <strong className="btn-strong">Login here</strong>
                  </NavLink>
                </span>
              </div>
              <div className="register__more">
                <span className="register__more-text">Register With</span>
                <div className="register__more-icon ">
                  <i className="fa fa-google google"></i>
                  <i className="fa fa-facebook facebook"></i>
                  <i className="fa fa-twitter twitter"></i>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
