import React from "react";
import BulletPoint from "./BulletPoint";
import OrderedList from "./OrderedList";

const AccountView = ({ data, heading, objectKey, keyUtility }) => {
  return (
    <div className="heading2">
      {heading}
      <ul className="contentContainer">
        {data &&
          data.hasOwnProperty(objectKey) &&
          data[objectKey]["BanksOfCreditCards"].map((val, ind) => (
            <OrderedList
              data={data}
              ind={ind}
              objectKey={objectKey}
              keyUtility={keyUtility}
            />
          ))}
      </ul>
    </div>
  );
};

export default AccountView;
