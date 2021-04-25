import { Link, Redirect } from "react-router-dom";

const Unauthorized = ({ user }) => {
  return user ? (
    <Redirect to="/" />
  ) : (
    <div className="container">
      <div>Unauthorized user, please login to view this page.</div>
      <p>
        <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Unauthorized;
