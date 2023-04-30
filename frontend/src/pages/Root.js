import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Root = () => {
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
    </React.Fragment>
  );
};

export default Root;
