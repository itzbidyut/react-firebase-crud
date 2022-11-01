import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
export default function AddNew() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const doc = await addDoc(collection(db, "users"), {
        name,
        city,
        phone,
        image: dimage,
        timeStamp: serverTimestamp(),
      });
      console.log("Document added: ", doc.id);
      setMsg("successfully added");
      setName("");
      setCity("");
      setPhone("");
      setImage("");
      setDimage("");
    } catch (e) {
      console.error("Error adding document: ", e);
      setMsg("somethings wrong");
    }
  };

  return (
    <div>
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
    </div>
  );
}
