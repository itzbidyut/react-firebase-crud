import { useContext, useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContect";
import SignLayout from "../components/SignLayout";
import { Link } from "react-router-dom";
import "../styles/login.scss";

export default function Login() {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { currentUser, dispatch } = useContext(AuthContext);

  const navitage = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navitage("/");
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        dispatch({ type: "LOGIN", payload: user });
        navitage("/");
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
  };
  return (
    <div className="loginPage">
      <SignLayout>
        <p className="login">Login</p>
        <p className="account">your account</p>
        <form onSubmit={handleLogin}>
          <div className="inputBox ">
            <p className="label">Email :</p>
            <input
              type="email"
              placeholder="enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="marginButton"
            />
          </div>
          <div className="inputBox">
            <p className="label">Password :</p>
            <input
              type="password"
              placeholder="enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error ? <p className="error">wrong email id and password</p> : <></>}
          <button type="submit">Sign in</button>
        </form>{" "}
        <p className="newAccount">
          Don't have an account? <Link to="/signup"> Sign Up!</Link>
        </p>
      </SignLayout>
    </div>
  );
}
