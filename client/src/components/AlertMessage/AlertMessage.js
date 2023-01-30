import React, { useEffect } from "react";
import "./AlertMessage.css";
const AlertMessage = ({ res, setShowAlertMessage }) => {
  useEffect(() => {
    setTimeout(function () {
      setShowAlertMessage(false);
    }, 3000);
  });

  if (!res.isError) {
    return (
      <div
        className="alert"
        style={{ backgroundColor: "#d4edda", color: "#2c693b" }}
      >
        {res?.isError ? res?.error.data.message : res?.data.data.message}
      </div>
    );
  }
  return (
    <div className="alert">
      {res?.isError ? res?.error.data.message : res?.data.data.message}
    </div>
  );
};

export default AlertMessage;
