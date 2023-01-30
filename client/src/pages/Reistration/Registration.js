import React, { useState } from "react";
import InputField from "../../components/InputField/InputField";
import "./Registration.css";
import { MdEmail, MdArrowBack } from "react-icons/md";
import { FaLock, FaUser } from "react-icons/fa";
import OptionField from "../../components/OptionField/OptionField";
import AlertMessage from "../../components/AlertMessage/AlertMessage";

import auth from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import validation from "../../utils/validation";
import { motion } from "framer-motion";

const Registration = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [termsChecked, setTerms] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showAlertMessage, setShowAlertMessage] = useState(false);
  const [data, setData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [isValid, errors] = validation({
      email,
      password,
      rePassword,
      firstName,
      lastName,
      gender,
      country,
    });
    if (isValid) {
      const digits = Math.floor(Math.random() * 9000000000) + 1000000000;
      const regId = digits.toString();
      const user = {
        email,
        password,
        firstName,
        lastName,
        username: firstName.toLowerCase(),
        gender,
        regId,
        country,
      };
      setFormErrors({});
      setLoading(true);
      const res = await auth(
        "https://user-auth-api-iva0.onrender.com/register",
        user
      );
      setLoading(false);
      setData(res);
      setShowAlertMessage(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="reg-container">
      <button style={{ border: "none" }} onClick={() => navigate("/")}>
        <MdArrowBack
          size="30"
          style={{
            position: "absolute",
            right: "20px",
            top: "20px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        />
      </button>
      {showAlertMessage ? (
        <AlertMessage res={data} setShowAlertMessage={setShowAlertMessage} />
      ) : (
        <></>
      )}
      <motion.form onSubmit={handleSubmit}>
        <div className="reg-heading">
          Responsive Registration
          <br /> Form
        </div>
        <InputField
          type="email"
          name="email"
          icon={<MdEmail className="pre-icon" />}
          placeholderText="Email"
          setValue={setEmail}
          error={formErrors}
          setError={setFormErrors}
        />
        <InputField
          type="password"
          name="password"
          icon={<FaLock className="pre-icon" />}
          placeholderText="Password"
          setValue={setPassword}
          error={formErrors}
          setError={setFormErrors}
        />
        <InputField
          type="password"
          name="rePassword"
          icon={<FaLock className="pre-icon" />}
          placeholderText="Re-Type Password"
          setValue={setRePassword}
          error={formErrors}
          setError={setFormErrors}
        />
        <div className="name-field">
          <InputField
            type="text"
            name="firstName"
            icon={<FaUser className="pre-icon" />}
            placeholderText="First Name"
            setValue={setFirstName}
            error={formErrors}
            setError={setFormErrors}
          />

          <InputField
            type="text"
            name="lastName"
            icon={<FaUser className="pre-icon" />}
            placeholderText="Last Name"
            setValue={setLastName}
            error={formErrors}
            setError={setFormErrors}
          />
        </div>
        <div>
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            onChange={() => {
              setGender("male");
              if (Object.keys(formErrors).length > 0) {
                setFormErrors({});
              }
            }}
          />
           <label htmlFor="male">Male</label> {" "}
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            onChange={() => {
              setGender("female");
              if (Object.keys(formErrors).length > 0) {
                setFormErrors({});
              }
            }}
          />
           <label htmlFor="female">Female</label>
          <p style={{ color: "red", fontSize: ".8rem" }}>
            {formErrors?.gender ?? ""}
          </p>
        </div>
        <OptionField setCountry={setCountry} error={formErrors} />
        <div>
          <input
            type="checkbox"
            id="cond1"
            name="cond1"
            onChange={() => {
              setTerms(!termsChecked);
            }}
          />
          <label htmlFor="vehicle1"> I agree with terms and conditions</label>
        </div>
        <div>
          <input type="checkbox" id="cond2" name="cond1" value="Bike" />
          <label htmlFor="vehicle1"> I want to receive the newsletter</label>
        </div>
        <button
          type="submit"
          className="reg-btn"
          disabled={!termsChecked}
          style={
            termsChecked
              ? { backgroundColor: "#f6ba1b" }
              : { backgroundColor: "grey" }
          }
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </motion.form>
    </div>
  );
};

export default Registration;
