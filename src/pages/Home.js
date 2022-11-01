import { useState, useEffect } from "react";
import "../styles/home.scss";
import Navbar from "../components/Navbar";
import UserList from "../components/UserList";
import AddNew from "../components/AddNew";
export default function Home() {
 



  return (
    <>
      <Navbar />
      <div className="homePage">
        <div className="container ">
          <div className="row">
            <div className="col-6">
              <AddNew />
             
            </div>
            <div className="col-6">
              <UserList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
