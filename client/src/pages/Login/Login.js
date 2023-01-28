import "./Login.css";

import { useState } from "react";
import auth from "../../utils/auth";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [showAlertMessage, setShowAlertMessage] = useState(false);
  const navigate = useNavigate();

  const signin = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    const validationError = {};
    let isError = false;
    if (!email) {
      validationError.email = "Email is required";
      isError = true;
    } else if (!/^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i.test(email)) {
      validationError.email = "Please enter a valid email";
      isError = true;
    }

    if (!password) {
      validationError.password = "Password is required";
      isError = true;
    } else if (password.trim().length < 4) {
      validationError.password = "Pssword must be at least 4 characters";
      isError = true;
    }
    if (isError) {
      setErr(validationError);
      return;
    }
    setLoading(true);
    const res = await auth(
      "https://user-auth-api-iva0.onrender.com/login",
      user
    );
    console.log(res);
    setLoading(false);
    setData((pre) => res);
    setShowAlertMessage(true);
    setErr({});
  };
  return (
    <div className="auth">
      {showAlertMessage ? (
        <AlertMessage res={data} setShowAlertMessage={setShowAlertMessage} />
      ) : (
        <></>
      )}
      <form className="login-form" onSubmit={signin}>
        <div className="form-heading">Login</div>
        <div className="form-field">
          <input
            type="email"
            placeholder="EMAIL"
            onChange={(e) => {
              setEmail(e.target.value);
              if (err.email) {
                setErr({ ...err, email: "" });
              }
            }}
          />
          <p style={{ color: "red" }}>{err.email}</p>
        </div>
        <div className="form-field">
          <input
            type="password"
            placeholder="PASSWORD"
            onChange={(e) => {
              setPassword(e.target.value);
              if (err.password) {
                setErr({ ...err, password: "" });
              }
            }}
          />
          <p style={{ color: "red" }}>{err.password}</p>
        </div>
        <div className="forgot-text">
          <p>FORGOT YOUR PASSWORD?</p>
        </div>
        <div className="form-buttons">
          <button
            type="button"
            className="register-button"
            onClick={() => navigate("/register")}
          >
            REGISTER
          </button>

          <button type="submit" className="signin-button">
            {loading ? "signing in..." : "SIGN IN"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
