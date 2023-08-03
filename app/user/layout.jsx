import React from "react";

const layout = ({children}) => {
  return (
    <>
    <div>this is user layout navbar</div>
    {children}
    <div>this is user layout footer</div>
    </>
  );
};

export default layout;
