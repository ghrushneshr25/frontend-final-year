import React, { useState } from "react";

export default (props) => {
  console.log(props.shipped);
  return (
    <div>
      {props.shipped.map((product) => (
        <p className="container3" key={product[0]}>{product[0] + " " + product[1]}</p>
      ))}
    </div>
  );
};
