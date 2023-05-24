import React from "react";
import classes from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={classes.navbar}>
      <ul className={classes.list}>
        <li className={classes.item}>
          <Link to="/">Products</Link>
        </li>
        <li className={classes.item}>
          <Link to="/users">Users</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
