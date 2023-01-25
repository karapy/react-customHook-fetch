import React from "react";
import PageContent from "./PageContent";
import { useRouteError } from "react-router";
import { Link } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

function Error() {
  const error = useRouteError();
  console.log(error.data.message)
  let title = "An error occured";
//   let message = "Something went wrong";
//   if (error.data.includes("Error: No route matches URL")) {
//     message = "Page not Found";
//   }

//   if (error.status === 500) {
//     message = error.data;
//   }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{error.data.message}</p>
        <Link to="..">Back</Link>
      </PageContent>
    </>
  );
}

export default Error;
