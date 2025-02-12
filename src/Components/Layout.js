import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="container mt-4 flex-grow-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
