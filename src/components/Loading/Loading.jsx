import React from "react";
import classes from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={classes.loading}>
      <span className={classes.loader} />
      <span className={classes.text}>
        Please wait while we are fetching the data
      </span>
    </div>
  );
};

export default Loading;
