import React, { useState } from "react";
import InputField from "../../components/InputField/InputField";
import "./Registration.css";
import { MdEmail, MdArrowBack } from "react-icons/md";
import { FaLock, FaUser } from "react-icons/fa";
import OptionField from "../../components/OptionField/OptionField";
import AlertMessage from "../../components/AlertMessage/AlertMessage";

import auth from "../../utils/auth";
import { useNavigate } from "react-router-dom";

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
    const [errors, isValid] = validateForm(
      email,
      password,
      rePassword,
      firstName,
      lastName,
      gender,
      country
    );
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

  const validateForm = (
    email,
    password,
    rePassword,
    firstName,
    lastName,
    gender,
    country
  ) => {
    let isValid = true;
    const regex = /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i;
    const errors = {};
    if (!email) {
      errors.email = "Email is required!";
      isValid = false;
    } else if (!regex.test(email)) {
      errors.email = "This is not a valid email format!";
      isValid = false;
    }
    if (!password) {
      errors.password = "Password is required!";
      isValid = false;
    } else if (password.length <= 4) {
      errors.password = "Password must be more than 4 characters";
      isValid = false;
    }
    if (!rePassword) {
      errors.rePassword = "Re entry of Password is required!";
      isValid = false;
    } else if (password.length > 4 && password !== rePassword) {
      errors.rePassword = "Password are not matching";
      isValid = false;
    }
    if (!firstName) {
      errors.firstName = "First Name is required!";
      isValid = false;
    } else if (firstName.length < 3) {
      errors.firstName = "First Name must be more than 2 characters";
      isValid = false;
    }
    if (!lastName) {
      errors.lastName = "Last Name is required!";
      isValid = false;
    } else if (lastName.length < 3) {
      errors.lastName = "Last Name must be more than 2 characters";
      isValid = false;
    }
    if (!gender) {
      errors.gender = "Choose a gender!";
      isValid = false;
    }
    if (!country || country === "0") {
      errors.country = "Country is required!";
      isValid = false;
    }
    return [errors, isValid];
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
      <form onSubmit={handleSubmit}>
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
      </form>
    </div>
  );
};

export default Registration;
