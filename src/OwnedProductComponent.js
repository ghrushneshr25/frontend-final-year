import React, { useState } from "react";

export default (props) => {
  console.log(props.owned);
  return (
    <div>
      {props.owned.map((product) => (
        <p className="container3" key={product[0]}>
          {product[0] + " " + product[1] + " " + product[2]}
        </p>
      ))}
    </div>
  );
};
