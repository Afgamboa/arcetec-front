import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";
import { login } from "./js/User.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const history = useNavigate();
  const [error, setError] = useState(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = {};
    if (!email) {
      errors.email = "Debe ingresar un correo electrónico.";
    }
    if (!password) {
      errors.password = "Debe ingresar una contraseña.";
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const res = await login(email, password);
    if (res && res.status === 200) {
      window.location.href = "/home";
    } else {
      setError(res);
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };

  return (
    <div className="login-container">
      <img
        src="https://www.arcetec.com.co/wp-content/uploads/2022/05/Logo_Original.svg"
        className="attachment-large size-large wp-image-6923 logo"
        alt=""
        width={300}
      />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="text-muted mb-2">Correo electrónico</label>
          <input
            type="email"
            className={`mb-3 form-control ${errors.email ? "is-invalid" : ""}`}
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Ingrese su correo electrónico"
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password"  className="text-muted mb-2">Contraseña</label>
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Ingrese su contraseña"
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>
        {errors.submit && (
          <div className="alert alert-danger mt-3">{errors.submit}</div>
        )}
        <button type="submit" className="btn btn-primary login mt-2">
          Iniciar sesión
        </button>
        {error && (
          <div className="alert alert-danger alert-sm" role="alert">
            {error}
          </div>
        )}
      </form>
      <p className="mt-3 mb-1 text-muted">¿Aún no estás registrado?</p>
      <button
        type="button"
        className="btn btn-link btn-light"
        onClick={() => history("/register")}
      >
        Registrarse
      </button>
    </div>
  );
};

export default Login;
