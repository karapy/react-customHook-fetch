import React from "react";
import { Outlet } from "react-router";
import MainNav from "../components/MainNav";


function RootLayout() {
  return (
    <>
      <MainNav />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
