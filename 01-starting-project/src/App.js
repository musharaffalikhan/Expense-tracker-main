import { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import UpdateProfile from "./components/StartingPage/UpdateProfile";
import AuthPage from "./pages/AuthPage";
import Errorpage from "./pages/Errorpage";
import HomePage from "./pages/HomePage";
import LoginPassChange from "./pages/LoginPassChange";
import ProfilePage from "./pages/ProfilePage";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        <Route path="/updateprof">
          {authCtx.isLoggedIn && <UpdateProfile />}
          {!authCtx.isLoggedIn && <Redirect to="/" />}
        </Route>
        <Route to="/changepass">
          {authCtx.isLoggedIn && <ProfilePage />}
          {!authCtx.isLoggedIn && <Redirect to="/" />}
        </Route>
        <Route path="/changeloginpass">
         {!authCtx.isLoggedIn && <LoginPassChange />}
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
