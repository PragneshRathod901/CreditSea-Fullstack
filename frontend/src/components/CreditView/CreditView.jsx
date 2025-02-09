import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import DetailList from "./DetailList";
import AccountView from "./AccountView";
import { useParams } from "react-router";

const CreditView = ({ rootURL }) => {
  const [data, setData] = useState({});
  let { id } = useParams();

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
        />
      </div>
      <div className="contentContainer">
        <DetailList
          data={data}
          heading={"Report Summary:"}
          objectKey={"ReportSummary"}
        />
      </div>
      <div className="contentContainer">
        <AccountView
          data={data}
          heading={"CreditAccounts Information :"}
          objectKey={"CreditAccountsInformation"}
        />
      </div>
    </div>
  );
};

export default CreditView;
