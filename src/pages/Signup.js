import { useContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContect";
import SignLayout from "../components/SignLayout";
import { Link } from "react-router-dom";

export default function Signup() {
  const [displayName, setDisplayName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const { currentUser, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const passwordHandle = (e) => {
    if (e.target.value.length > 0) {
      setError(" ");
    }
    if (e.target.value.length > 6) {
      setPassword(e.target.value);
    } else {
      setError("Password should be at least 6 characters ");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("displayName----", displayName);
    console.log("phoneNumber----", phoneNumber);
    console.log("email----", email);

    if (password === password2) {
      createUserWithEmailAndPassword(
        auth,
        email,
        password,
        displayName,
        phoneNumber
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          dispatch({ type: "LOGIN", payload: user });
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          console.log(error.message);
          if (
            error.message === "Firebase: Error (auth/email-already-in-use)."
          ) {
            setError("Email already in use");
          } else {
            setError("signup error !!!");
          }
        });
    } else {
      setError("Password does not match ! ");
    }
  };

  return (
    <>
      <div className="loginPage">
        <SignLayout>
          <p className="login">Create</p>
          <p className="account">New account</p>
          <form onSubmit={handleLogin}>
            <div className="inputBox">
              <p className="label"> Name :</p>

              <input
                type="text"
                placeholder="enter your name"
                onChange={(e) => setDisplayName(e.target.value)}
                required
                className="marginButton"
              />
            </div>
            <div className="inputBox">
              <p className="label">Phone :</p>

              <input
                type="number"
                placeholder="enter your Phone number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="marginButton"
              />
            </div>
            <div className="inputBox">
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
                onChange={passwordHandle}
                required
                className="marginButton"
              />
            </div>
            <div className="inputBox">
              <p className="label">Confirm Password :</p>
              <input
                type="password"
                placeholder="Confirm password"
                onChange={(e) => setPassword2(e.target.value)}
                required
              />
            </div>
            {error ? <p className="error"> {error}</p> : <></>}
            <button type="submit">Sign up</button>
          </form>
          <p className="newAccount">
            Already have an account? <Link to="/login"> Sign In!</Link>
          </p>
        </SignLayout>
      </div>
    </>
  );
}
