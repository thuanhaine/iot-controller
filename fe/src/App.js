import { Fragment, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import {
  Admin_user,
  Manage_user,
  Normal_user,
  Unknown_user,
} from "./routes/Routes";
import { Login, Home, DefaultLayout } from "./components/components_index";
function App() {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [user, setUser] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetch(`${process.env.REACT_APP_API}/users/` + userId, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setIsLogin(true);
          console.log(data);
          console.log(user);
        });
    }
  }, []);

  return isLogin ? (
    <Routes>
      {user.role == "Admin"
        ? Admin_user.map((route, index) => {
            let Layout = DefaultLayout;
            if (route.layout === null) {
              Layout = Fragment;
            } else if (route.layout) {
              Layout = route.layout;
            }
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })
        : user.role == "Manager"
        ? Manage_user.map((route, index) => {
            let Layout = DefaultLayout;
            if (route.layout === null) {
              Layout = Fragment;
            } else if (route.layout) {
              Layout = route.layout;
            }
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })
        : Normal_user.map((route, index) => {
            let Layout = DefaultLayout;
            if (route.layout === null) {
              Layout = Fragment;
            } else if (route.layout) {
              Layout = route.layout;
            }
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
    </Routes>
  ) : (
    <Routes>
      {Unknown_user.map((route, index) => {
        let Layout = DefaultLayout;
        if (route.layout === null) {
          Layout = Fragment;
        } else if (route.layout) {
          Layout = route.layout;
        }
        const Page = route.component;
        return <Route key={index} path={route.path} element={<Page />} />;
      })}
    </Routes>
  );
}

export default App;
