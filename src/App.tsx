import React, { useEffect } from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Coupons } from "./components/coupons/Coupons";
import { Rules } from "./components/rules/Rules";
import { Login } from "./components/login/Login";
import { RootState, store } from "./store";
import { Provider, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import fwIcon from "./assets/images/fw.png";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContainer>
          <Switch>
            <Route path="/coupons">
              <Coupons />
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
  const history = useHistory();

  // useEffect(() => {
  //   if (loginState.loggedIn) {
  //     history.push("/coupons");
  //   } else {
  //     history.push("/login");
  //   }
  // }, [loginState]);

  return (
    <section className={"container"}>
      <header>
        <img src={fwIcon} />
      </header>
      {children}
    </section>
  );
};

export default App;
