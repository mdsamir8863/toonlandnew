import { userRequest } from "../../requestMethod";
import React, { useRef, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebaseAuth";
import { useSelector } from "react-redux";

export default function FirebaseUpload() {
  const { currentUser } = useSelector((state) => state.user);
  const [progressPercentImage, setProgressPercentImage] = useState(0);
  const [progressPercentPdf, setProgressPercentPdf] = useState(0);
  const [prfPic, setPrfPic] = useState(null);
  const [cvrPic, setCvrPic] = useState(null);
  const imageRef = useRef(null);
  const pdfRef = useRef(null);

  const [formData, setFormData] = React.useState({
    username: "",
    dob: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const uploadImage = (e) => {
    e.preventDefault();

    const file = imageRef.current.files[0];
    const pdf = pdfRef.current.files[0];

    const fileName = new Date().getTime() + file.name;
    const pdfName = new Date().getTime() + pdf.name;

    const storage = getStorage(app);

    const storageRef = ref(storage, `images/profile/${fileName}`);
    const pdfStorageRef = ref(storage, `images/profile/${pdfName}`);

    const uploadTask = uploadBytesResumable(storageRef, file);
    const pdfUploadTask = uploadBytesResumable(pdfStorageRef, pdf);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgressPercentImage(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setPrfPic(downloadURL);
        });
      }
    );

    pdfUploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("Upload is " + progress + "% done");
        setProgressPercentPdf(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {},
      () => {
        getDownloadURL(pdfUploadTask.snapshot.ref).then((downloadURL) => {
          console.log("PDF available at", downloadURL);
          setCvrPic(downloadURL);
        });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const product = {
      ...formData,
      prfPic,
      cvrPic,
    };

    try {
      userRequest.put(`users/${currentUser._id}`, product);
      // window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "fit-content",
          gap: "1rem",
          margin: "10rem auto",
        }}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="username"
          placeholder="title"
          onChange={handleChange}
        />{" "}
        <input
          type="date"
          name="dob"
          placeholder="dob"
          onChange={handleChange}
        />
        <div>
          <input ref={imageRef} type="file" />
          <i> {Math.round(progressPercentImage)}%</i>
        </div>
        <div>
          <input ref={pdfRef} type="file" />
          <i> {Math.round(progressPercentPdf)}%</i>
        </div>
        <button
          disabled={progressPercentPdf === 100 && progressPercentImage === 100}
          onClick={uploadImage}
        >
          Upload Product
        </button>
        <button
          // disabled={progressPercentPdf !== 100 && progressPercentImage !== 100}
          type="submit"
        >
          submit
        </button>
      </form>
    </>
  );
}
