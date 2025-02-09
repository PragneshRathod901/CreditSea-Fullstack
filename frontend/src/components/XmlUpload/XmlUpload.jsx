import React, { useState } from "react";
import "./index.css";
import axios from "axios";

const XmlUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const uploadReq = async (data) => {
    try {
      console.log(JSON.stringify({ xml: data }));
      const response = await axios.post("http://localhost:8082/api/upload", {
        xml: data,
      });
      console.log(response.data._id);
      setMessage("Success!");
    } catch (error) {
      setMessage("Upload failed. Try again.");
      console.error(error);
    }
  };
  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }
    var reader = new FileReader();
    reader.onload = async function (event) {
      await uploadReq(event.target.result);
    };
    reader.readAsText(file);
  };
  return (
    <div className="xmlContainer">
      <div className="formContainer">
        <div className="formHeading">Upload XML File</div>
        <input type="file" accept=".xml" onChange={handleFileChange} />
        {message && <p className="msgBoc">{message}</p>}
        <button className="primaryBtn" onClick={handleUpload}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default XmlUpload;
