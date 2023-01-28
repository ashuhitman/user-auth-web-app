import "./InputField.css";

import React from "react";

const InputField = ({
  type,
  icon,
  placeholderText,
  setValue,
  name,
  error,
  setError,
}) => {
  return (
    <div className="input-field-container">
      <div className="input-field">
        {icon}
        <input
          type={type}
          name={name}
          placeholder={placeholderText}
          onChange={(e) => {
            setValue(e.target["value"]);
            if (Object.keys(error).length > 0) {
              delete error[name];
              setError(error);
            }
          }}
        />
      </div>
      <p style={{ color: "red", fontSize: ".8rem" }}>{error?.[name] ?? ""}</p>
    </div>
  );
};

export default InputField;
