import React, { useState } from "react";
import "./index.css";
import axios from "axios";
import { useNavigate } from "react-router";

const XmlUpload = ({ rootURL }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  let navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const uploadReq = async (data) => {
    try {
      const response = await axios.post(rootURL + "upload", {
        xml: data,
      });
      navigate("/Report/" + response.data._id);
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
