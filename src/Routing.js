import React from "react";
import { Route, Routes } from "react-router-dom";
import { MainRouter } from "./Routers";
import Layout from "./Layout";

const Navigation = () => {
  return (
    <>
      <Routes>
        {MainRouter.map((item, ind) => (
          <Route
            exact={item.exact}
            path={item.path}
            key={ind}
            element={
              <Layout>
                <item.component />
              </Layout>
            }
          />
        ))}
      </Routes>
    </>
  );
};

export default Navigation;
