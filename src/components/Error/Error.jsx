import React from "react";
import classes from "./Error.module.css";
const Error = (props) => {
  const { handleRetry } = props;
  return (
    <div className={classes.error}>
      <span className={classes.text}>
        There seems to be a problem while fetching the data
      </span>
      <button className={classes.btn} onClick={handleRetry}>
        Retry
      </button>
    </div>
  );
};

export default Error;
