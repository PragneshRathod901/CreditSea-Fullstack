import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import DetailList from "./DetailList";
import AccountView from "./AccountView";
import { useParams } from "react-router";

const CreditView = ({ rootURL }) => {
  const [data, setData] = useState({});
  let { id } = useParams();
  let keyUtility = (str) => {
    let result = "";
    for (let i = 0; i < str.length; i++) {
      if (i > 0 && str[i] === str[i].toUpperCase()) {
        result += " ";
      }
      result += str[i];
    }
    return result;
  };
  useEffect(() => {
    axios
      .get(rootURL + id)
      .then((res) => {
        if (res) {
          setData(res.data);
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="container">
      <div className="heading">Credit Report</div>
      <div className="contentContainer">
        <DetailList
          data={data}
          heading={"Basic Details:"}
          objectKey={"BasicDetails"}
          keyUtility={keyUtility}
        />
      </div>
      <div className="contentContainer">
        <DetailList
          data={data}
          heading={"Report Summary:"}
          objectKey={"ReportSummary"}
          keyUtility={keyUtility}
        />
      </div>
      <div className="contentContainer">
        <AccountView
          data={data}
          heading={"CreditAccounts Information :"}
          objectKey={"CreditAccountsInformation"}
          keyUtility={keyUtility}
        />
      </div>
    </div>
  );
};

export default CreditView;
