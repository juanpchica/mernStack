import React, { useEffect } from "react";
export const Alert = (props) => {
  const { show, msg, type } = props.action;
  const removeAlert = props.removeAlert;

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={"alert alert-" + type} role="alert">
      {msg}
    </div>
  );
};
