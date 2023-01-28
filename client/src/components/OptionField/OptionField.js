import React from "react";
import countries from "../../data/countries.json";
import "./OptionField.css";

const OptionField = ({ setCountry }) => {
  return (
    <select
      className="choose-country"
      onChange={(e) => setCountry(e.target.value)}
    >
      <option key="0" value="0">
        Select a country
      </option>
      {countries[2].data.map((item) => (
        <option key={item.country_id} value={item.country_name}>
          {item.country_name}
        </option>
      ))}
    </select>
  );
};

export default OptionField;
