import { userRequest } from "./requestMethod";
import React, { useRef, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import app from "./firebaseAuth";

export default function FirebaseUpload() {
  const [progressPercentImage, setProgressPercentImage] = useState(0);
  const [progressPercentPdf, setProgressPercentPdf] = useState(0);
  const [cat, setCat] = useState([]);
  const [topics, setTopics] = React.useState([]);
  const [imgUrl, setImgUrl] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const imageRef = useRef(null);
  const pdfRef = useRef(null);

  const [formData, setFormData] = React.useState({
    title: "",
    desc: "",
    price: "",
  });
  const handleCat = (e) => {
    setCat(e.target.value.toLowerCase().split(","));
  };

  const handleTopics = (e) => {
    setTopics(e.target.value.toLowerCase().split(","));
  };

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

    const storageRef = ref(storage, `images/${fileName}`);
    const pdfStorageRef = ref(storage, `productsPDF/${pdfName}`);

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
          setImgUrl(downloadURL);
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
          setPdfUrl(downloadURL);
        });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const product = {
      ...formData,
      productCat: cat,
      topics,
      img: imgUrl,
      product: pdfUrl,
    };
    try {
      userRequest.post("/products", product);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form
        style={{
          margin: "10rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "300px",
        }}
        onSubmit={handleSubmit}
      >
        <input
          required
          type="text"
          name="title"
          placeholder="title"
          onChange={handleChange}
        />{" "}
        <input
          required
          type="text"
          name="desc"
          placeholder="desc"
          onChange={handleChange}
        />
        <div>
          <input ref={imageRef} type="file" />
          <i> {Math.round(progressPercentImage)}%</i>
        </div>
        <div>
          <input accept="application/pdf" ref={pdfRef} type="file" />
          <i> {Math.round(progressPercentPdf)}%</i>
        </div>
        <input
          required
          type="number"
          name="price"
          placeholder="price"
          onChange={handleChange}
        />
        <input
          required
          type="text"
          name="productCat"
          placeholder="productCat"
          onChange={handleCat}
        />
        <input
          type="text"
          name="topics"
          placeholder="topics"
          onChange={handleTopics}
        />
        <button
          disabled={progressPercentPdf === 100 && progressPercentImage === 100}
          onClick={uploadImage}
        >
          Upload Product
        </button>
        <button
          disabled={progressPercentPdf !== 100 && progressPercentImage !== 100}
          type="submit"
        >
          submit
        </button>
      </form>
    </>
  );
}
