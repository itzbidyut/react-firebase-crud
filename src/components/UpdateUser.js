import React, { useState, useEffect } from "react";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#Modal");

export default function UpdateUser({ closeModal, modalIsOpen, deletId }) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [dimage, setDimage] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const uploadImage = () => {
      const newName = new Date().getTime() + image.name;

      const storageRef = ref(storage, "Image/" + newName);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log("errorrrr");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setDimage(downloadURL);
          });
        }
      );
    };
    image && uploadImage();
  }, [image]);

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "users", deletId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("Document data:", data);
        setName(data.name);
        setCity(data.city);
        setPhone(data.phone);

        setDimage(data.image);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    getData();
  }, [deletId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const deletItem = doc(db, "users", deletId);

      await updateDoc(deletItem, {
        name,
        city,
        phone,
        image: dimage,
      });
      console.log("Document updated: ", doc.id);
      setMsg("successfully added");
      setName("");
      setCity("");
      setPhone("");
      setImage("");
      setDimage("");
      closeModal();
    } catch (err) {
      console.log(err);
      setMsg("somethings wrong");
    }
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>id is - {deletId}</h2>
        <button onClick={closeModal}>close</button>
        <p>Add details</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <br></br>
          <br></br>
          <input
            type="text"
            placeholder="enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <br></br>
          <br></br>
          <input
            type="number"
            placeholder="enter phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <br></br>
          <br></br>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          {dimage ? <img src={dimage} alt="img" /> : <></>}
          <br></br>
          <br></br>
          <button type="submit">Submit</button>
        </form>
        <p>{msg}</p>
      </Modal>
    </div>
  );
}
