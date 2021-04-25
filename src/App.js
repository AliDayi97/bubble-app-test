import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { Menu } from "semantic-ui-react";
import Login from "./components/Login";
import Home from "./components/Home";
import { useState } from "react";
import { useUserContext } from "./contexts/UserContext";
import Bookings from "./components/Bookings";
import Sitters from "./components/Sitters";
import Booking from "./components/Booking";
import Unauthorized from "./components/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";
import Sitter from "./components/Sitter";
import Profile from "./components/Profile";

const App = () => {
  const [activeTab, setActiveTab] = useState();
  const { user, login, logout } = useUserContext();

  const handleTabSelected = (e, { name }) => {
    setActiveTab(name);
  };

  const renderAuthItems = () => {
    return (
      <>
        <Menu.Item
          as={Link}
          to="/home"
          name="home"
          active={activeTab === "home"}
          onClick={handleTabSelected}
        />
        <Menu.Item
          as={Link}
          to="/bookings"
          name="bookings"
          active={activeTab === "bookings"}
          onClick={handleTabSelected}
        />
        <Menu.Item
          as={Link}
          to="/sitters"
          name="sitters"
          active={activeTab === "sitters"}
          onClick={handleTabSelected}
        />
        <Menu.Item
          as={Link}
          to="/profile"
          name="profile"
          active={activeTab === "profile"}
          onClick={handleTabSelected}
        />
        <Menu.Menu position="right">
          <Menu.Item
            name="logout"
            active={activeTab === "logout"}
            onClick={logout}
          />
        </Menu.Menu>
      </>
    );
  };

  const renderNonAuthItems = () => {
    return (
      <Menu.Item
        as={Link}
        to="/login"
        name="login"
        active={activeTab === "friends"}
        onClick={handleTabSelected}
      />
    );
  };

  return (
    <Router>
      <div className="App">
        <div className="navbar">
          <Menu pointing secondary>
            {user ? renderAuthItems() : renderNonAuthItems()}
          </Menu>
        </div>
      </div>

      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route
          path="/home"
          render={(props) => <Home {...props} user={user} />}
        />
        <ProtectedRoute path="/bookings" component={Bookings} user={user} />
        <ProtectedRoute path="/booking/:id" component={Booking} user={user} />
        <ProtectedRoute path="/sitters" component={Sitters} user={user} />
        <ProtectedRoute path="/sitter/:id" component={Sitter} user={user} />
        <ProtectedRoute path="/profile" component={Profile} user={user} />
        <Route path="/login">
          <Login user={user} login={login} />
        </Route>
        <Route path="/unauthorized">
          <Unauthorized user={user} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
