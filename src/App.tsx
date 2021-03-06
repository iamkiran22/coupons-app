import React, { useEffect } from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Host } from "./components/coupons/Coupons";
import { Rules } from "./components/rules/Rules";
import { Login } from "./components/login/Login";
import { RootState, store } from "./store";
import { Provider, useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import fwIcon from "./assets/images/fw.png";
import { checkUserLogin, logout } from "./reducers/login-reducer";
import { LogoutOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContainer>
          <Switch>
            <Route path="/coupons">
              <Host />
            </Route>
            <Route path="/addrule">
              <Rules />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </AppContainer>
      </Router>
    </Provider>
  );
}

const AppContainer: React.FC = ({ children }) => {
  const loginState = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!loginState.loading) {
      if (loginState.loggedIn) {
        history.push("/coupons");
        document.body.classList.remove("login-background");
      } else {
        history.push("/login");
        document.body.classList.add("login-background");
      }
    }
  }, [loginState]);

  //Check if user is already logged in
  useEffect(() => {
    dispatch(checkUserLogin());
  }, []);

  const logOutUser = () => {
    dispatch(logout());
  };

  return (
    <section className={"container"}>
      {loginState.loggedIn && (
        <header>
          <img src={fwIcon} />
          <Tooltip placement="topLeft" title={<span>Logout</span>}>
            {" "}
            <LogoutOutlined
              onClick={logOutUser}
              style={{ fontSize: "24px" }}
            />{" "}
          </Tooltip>
        </header>
      )}
      {children}
    </section>
  );
};

export default App;
