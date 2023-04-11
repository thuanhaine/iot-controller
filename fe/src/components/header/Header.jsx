import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Header.scss";
function Header() {
  const [isActive, setActive] = useState(1);
  const [user, setUser] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const navigate = useNavigate();

  useEffect(() => {
    const UserStore = localStorage.getItem("userId");
    if (UserStore) {
      fetch(`${process.env.REACT_APP_API}/users/` + userId, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
        });
    }
  }, [user]);

  const handdleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login", { replace: true });
    window.location.reload();
  };
  return (
    <>
      <div className="header">
        <div className="header-left">
          <ul className="header-left--actions">
            <li
              className={
                isActive == 1
                  ? "header-left--actions-item acitve"
                  : "header-left--actions-item"
              }
            >
              <NavLink
                className="header-left--actions-item--link"
                to="/"
                onClick={(e) => setActive(1)}
                cl
              >
                Main
              </NavLink>
              {/* <NavLink className="header-left--actions-item--link" to="/home">Controller</NavLink> */}
            </li>
            {(user && user.role == "Manager") || user.role == "Admin" ? (
              <li
                className={
                  isActive == 2
                    ? "header-left--actions-item acitve"
                    : "header-left--actions-item"
                }
              >
                <NavLink
                  className="header-left--actions-item--link"
                  to="/manage-user"
                  onClick={(e) => setActive(2)}
                >
                  Setting
                </NavLink>
                {/* <NavLink className="header-left--actions-item--link" to="/management-controller">Management Controller</NavLink> */}
              </li>
            ) : (
              <></>
            )}

            {user.role == "Admin" ? (
              <li
                className={
                  isActive == 3
                    ? "header-left--actions-item acitve"
                    : "header-left--actions-item"
                }
              >
                <NavLink
                  className="header-left--actions-item--link"
                  to="/admin-user"
                  onClick={(e) => setActive(3)}
                >
                  Report
                </NavLink>
                {/* <NavLink className="header-left--actions-item--link" to="/management-user">Management User</NavLink> */}
              </li>
            ) : (
              <></>
            )}
          </ul>
        </div>
        <button className="btn-logout" onClick={handdleLogout}>
          Log Out
        </button>
      </div>
    </>
  );
}

export default Header;
