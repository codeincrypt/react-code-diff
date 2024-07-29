import React from "react";
import Header from "./page/Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
        <div className="container">
          {children}
        </div>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
