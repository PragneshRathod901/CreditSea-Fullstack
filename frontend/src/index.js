import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router";
import CreditView from "./components/CreditView/CreditView";
import XmlUpload from "./components/XmlUpload/XmlUpload";

const root = ReactDOM.createRoot(document.getElementById("root"));
const url = "http://localhost:8082/api/";
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App child={<XmlUpload rootURL={url} />} />} />
        <Route
          path="/Report/:id"
          element={<App child={<CreditView rootURL={url} />} />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
