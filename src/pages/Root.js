import React from "react";
import MainNavigation from "../components/MainNavigation";
import { Outlet, useNavigation } from "react-router-dom";

function Root() {
  const navigate = useNavigation();
  
  return (
    <>
      <MainNavigation />
      {navigate.state === 'loading' && <p className="isloading">is Loading....</p>}
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Root;
