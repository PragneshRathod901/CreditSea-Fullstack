import React from "react";
import BulletPoint from "./BulletPoint";
import "./index.css";

const DetailList = ({ data, heading, objectKey }) => {
  return (
    <div className="heading2">
      {heading}
      <ul className="contentContainer">
        {data &&
          data.hasOwnProperty(objectKey) &&
          Object.keys(data[objectKey]).map((_key, index) => (
            <BulletPoint
              heading={_key}
              content={data[[objectKey]][_key]}
              key={_key}
            />
          ))}
      </ul>
    </div>
  );
};

export default DetailList;
