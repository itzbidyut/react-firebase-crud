// import { useState } from "react";
// import {
//   getAuth,
//   sendCustomPasswordResetEmail,
//   actionCodeSettings,
// } from "firebase/auth";
// import SignLayout from "../components/SignLayout";
// import { Link } from "react-router-dom";
// import { auth } from "../firebase";

// export default function ResetPassword() {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = (e) => {
//     e.preventDefault();
//     try {
//       auth.sendPasswordResetEmail(email);
//       setError("send");
//     } catch (error) {
//       console.log(error);
//       setError(error);
//     }

//     // auth.sendCustomPasswordResetEmail(email)
//     //   .then((link) => {
//     //     // Construct sign-in with email link template, embed the link and
//     //     // send using custom SMTP server.
//     //     return sendCustomPasswordResetEmail(email, email, link);
//     //   })
//     //   .catch((error) => {
//     //     // Some error occurred.
//     //   });
//   };

//   return (
//     <>
//       <div className="loginPage">
//         <SignLayout>
//           <p className="login">reset</p>
//           <p className="account">your password</p>
//           <form onSubmit={handleLogin}>
//             <div className="inputBox">
//               <p className="label">Email :</p>

//               <input
//                 type="email"
//                 placeholder="enter your email"
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             {error ? <p className="error"> {error}</p> : <></>}
//             <button type="submit" className="marginButton">
//               Reset Password
//             </button>
//           </form>
//           <p className="newAccount">
//             Already have an account? <Link to="/login"> Sign In!</Link>
//           </p>
//           <p className="newAccount">
//             Create a new account <Link to="/signup"> Sign up!</Link>
//           </p>
//         </SignLayout>
//       </div>
//     </>
//   );
// }
