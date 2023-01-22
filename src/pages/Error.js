import React from "react";
import MainNav from "../components/MainNav";

function Error() {
  return (
    <>
      <MainNav />
      <div>
        <h1>An Error Occured!</h1>
        <p>could not find this page!</p>
      </div>
    </>
  );
}

export default Error;
