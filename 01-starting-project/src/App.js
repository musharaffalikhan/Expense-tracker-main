import { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import ProfileForm from "./components/Profile/ProfileForm";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        {!authCtx.isLoggedIn && (
          <Route path="/auth" exact>
            <AuthPage />
          </Route>
        )}
        <Route path="/">
          {authCtx.isLoggedIn && <HomePage />}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>
        {/* <Route path="/updateprof">
          {authCtx.isLoggedIn && <UpdateProfile />}
        </Route> */}
        <Route to="/changepass">
          {authCtx.isLoggedIn && <ProfilePage />}
          {!authCtx.isLoggedIn && <Redirect to="/" />}
        </Route>
        <Route path="/changepass">
          <ProfileForm />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
