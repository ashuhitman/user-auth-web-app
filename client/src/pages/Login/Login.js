import "./Login.css";

import { useState } from "react";
import auth from "../../utils/auth";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import { useNavigate } from "react-router-dom";
import validation from "../../utils/validation";
import { motion } from "framer-motion";

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
    const [isValid, errors] = validation(user, "login");
    if (!isValid) {
      setErr(errors);
      return;
    }
    setLoading(true);
    const res = await auth(
      "https://user-auth-web-api.onrender.com/login",
      user
    );
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
      <motion.form
        className="login-form"
        onSubmit={signin}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
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
            {loading ? "Signing in..." : "SIGN IN"}
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default Login;
