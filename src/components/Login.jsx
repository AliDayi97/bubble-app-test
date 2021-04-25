import { useState } from "react";
import { Redirect } from "react-router";
import { Button, Input, Label } from "semantic-ui-react";
import { useUiContext } from "../contexts/UiContext";
import "./Login.css";

const Login = ({ user, login }) => {
  const [email, setEmail] = useState("janet.stevans@siliconrhino.io");
  const [password, setPassword] = useState("12345");

  const { error, loading } = useUiContext();

  const handleLogin = () => {
    if (email && password) {
      login(email, password);
    }
  };
  
  return loading ? (
    <div>Loading ... </div>
  ) : user ? (
    <Redirect to="/home" />
  ) : (
    <div className="container">
      <div className="email-field">
        <Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="password-field">
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="button-field">
        <Button onClick={handleLogin}>Login</Button>
      </div>
      <div className="error-field">
        {error ? <Label color="red">{error.message}</Label> : <div></div>}
      </div>
    </div>
  );
};

export default Login;
