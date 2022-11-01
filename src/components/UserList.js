import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import UpdateUser from "./UpdateUser";

export default function UserList() {
  const [data, setData] = useState();
  const [deletId, setDeletId] = useState();
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  const allData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));

      setData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    allData();
  }, []);

  const refreshList = () => {
    allData();
  };

  const deleteItem = async (id) => {
    console.log("deleteItem------", id);

    try {
      await deleteDoc(doc(db, "users", id));
      allData();
    } catch (err) {
      console.log(err);
    }
  };
  const editItem = (id) => {
    setIsOpen(true);
    setDeletId(id);
    console.log("id is-------", id);
  };
  return (
    <div>
      <button onClick={refreshList}>refresh</button>
      <table className=" table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">name</th>
            <th scope="col">city</th>
            <th scope="col">phone</th>
            <th scope="col">image</th>
            <th scope="col"> </th>
          </tr>
        </thead>
        <tbody>
          {data ? (
            data.map((item, index) => (
              <tr key={index}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.city}</td>
                <td>{item.phone}</td>
                <td>
                  <img src={item.image} alt="img" className="img-table" />
                </td>
                <td>
                  <div onClick={(e) => deleteItem(item.id)}>
                    <span className="material-symbols-outlined pointer">
                      delete
                    </span>
                  </div>
                </td>
                <td>
                  <div onClick={(e) => editItem(item.id)}>
                    <span className="material-symbols-outlined pointer">
                      edit
                    </span>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>

      <UpdateUser
        closeModal={closeModal}
        openModal={openModal}
        modalIsOpen={modalIsOpen}
        deletId={deletId}
      />
    </div>
  );
}
