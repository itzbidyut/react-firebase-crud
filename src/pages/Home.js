import { useContext } from "react";
import { AuthContext } from "../context/AuthContect";
import "../styles/home.scss";
import Navbar from "../components/Navbar";

export default function Home() {
  const { currentUser, dispatch } = useContext(AuthContext);
  const logout = () => {
    dispatch({ type: "LOGOUT", payload: null });
  };
  return (
    <>
      <Navbar />
      <div className="homePage">
        <div className="container mt-5">
          Home <br></br> <br></br> <br></br>
          <button onClick={logout}>Logout</button>
          <br></br> <br></br> <br></br> <br></br>
          {currentUser.email}
        </div>
      </div>
    </>
  );
}
