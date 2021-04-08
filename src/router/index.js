import {
  BrowserRouter as ReactRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "pages/LoginPage";
import HomePage from "pages/HomePage";

function Router() {
  return (
    <ReactRouter>
      <Redirect exact from="/" to="/login" />
      <Switch>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute path="/home">
          <HomePage />
        </PrivateRoute>
      </Switch>
    </ReactRouter>
  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default Router;
