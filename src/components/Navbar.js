import { useContext } from "react";
import { AuthContext } from "../context/AuthContect";
import "../styles/Navbar.scss";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { currentUser, dispatch } = useContext(AuthContext);
  const logout = () => {
    dispatch({ type: "LOGOUT", payload: null });
  };
  return (
    <div className="Navbar">
      <div className="container">
        <div className="navtitle">
          <Link to="/">
            <h3>React Firebase</h3>
          </Link>
        </div>
        <div className="rightSide">
          {currentUser ? (
            <>
              <Link to="/">
                <p>Home</p>
              </Link>
            </>
          ) : (
            <></>
          )}
          {currentUser ? (
            <>
              <p>
                Wellcome <span className="white"> {currentUser.email}</span>
              </p>
            </>
          ) : (
            <>
              <Link to="/login">
                <p>Sign in</p>
              </Link>
              <Link to="/signup">
                <p>Sign up</p>
              </Link>
            </>
          )}

          {currentUser ? <button onClick={logout}>Logout</button> : <></>}
        </div>
      </div>
    </div>
  );
}
