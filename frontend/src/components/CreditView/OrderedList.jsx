import React from "react";
import BulletPoint from "./BulletPoint";

const OrderedList = ({  data, objectKey, ind,keyUtility }) => {
  return (
    <li>
      <div>{ind+1}.</div>
      <ol>
        {Object.keys(data[objectKey]).map(
          (_key, index) =>
            _key !== "Addresses" && (
              <BulletPoint
                heading={keyUtility(_key)}
                content={data[[objectKey]][_key][ind]}
                key={_key}
              />
            )
        )}
      </ol>
    </li>
  );
};

export default OrderedList;
