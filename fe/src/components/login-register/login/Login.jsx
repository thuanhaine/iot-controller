import { NavLink, json, useNavigate } from "react-router-dom";
import Logo from "./logo_chicken_xoaphong.jpg";
import { useState, useEffect } from "react";
import "./Login.scss";
import Loading from "../loading/Loading";
import { WiCloudyGusts } from "react-icons/wi";

function Login() {
  const [inputName, setName] = useState("");
  const [inputPassword, setPassword] = useState("");
  const [isloading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    if (localStorage.getItem("userID")) {
      localStorage.clear();
    }
    const data = { name: inputName, password: inputPassword };

    fetch("http://localhost:3001/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          localStorage.setItem("userId", data.id);
          alert("Success");
          navigate("/home", { replace: true });
          window.location.reload();
        } else alert("Error");
      });
  };

  return (
    <>
      <div className="login">
        <div className="login-left">
          <img src={Logo} className="Login-left--logo" alt="Logo" />
          {isloading ? (
            <div className="login-loading">
              <Loading />
            </div>
          ) : (
            <></>
          )}

          <form onSubmit={handleLogin}>
            <div className="login-content">
              <h1 className="login-title">Login to your account</h1>
              <div className="login-input-form">
                <span className="login-input-span"></span>
                <input
                  type="text"
                  value={inputName}
                  required
                  className="login-input-box"
                  placeholder="Username"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
              <div className="login-input-form">
                <span className="login-input-span"></span>
                <input
                  type="password"
                  value={inputPassword}
                  required
                  className="login-input-box"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              <button className="btn-login">Login</button>
              <div className="text__forgot mr-16">
                <span className="text-forgotPW">
                  Forgot Password ?
                  <NavLink className="navLink" to="/register" onClick={this}>
                    <strong> Create an account</strong>
                  </NavLink>
                </span>
              </div>
              <div className="login__more">
                <span className="login__more-text">Login With</span>
                <div className="login__more-icon ">
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

export default Login;
