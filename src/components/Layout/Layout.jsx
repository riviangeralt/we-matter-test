import React from "react";
import Navbar from "../Navbar/Navbar";
import classes from "./Layout.module.css";

const Layout = (props) => {
  const { children } = props;
  return (
    <div className={classes.layout}>
      <Navbar />
      <main className={classes.main}>{children}</main>
    </div>
  );
};

export default Layout;
