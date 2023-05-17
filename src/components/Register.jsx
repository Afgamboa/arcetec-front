import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Register.css";
import { register, validateData } from "./js/User";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const history = useNavigate();

  const hasEmailError = errors && errors.email;
  const hasPasswordError = errors && errors.password;
  const hasNameError = errors && errors.name;
  const hasConfirmPassError = errors && errors.confirmPassword;

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
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
    if (!confirmPassword) {
      errors.confirmPassword = "Debe confirmar la contraseña.";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden.";
    }
    if (!name) {
      errors.name = "Debe ingresar un nombre.";
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    const validationResult = validateData({ name, email, password });

    const res = await register(name, email, password);
    if (validationResult.isValid) {
      if (res && res.status === 201) {
        history(-1);
      } else {
        setErrors(res);
        setTimeout(() => {
          setErrors(null);
        }, 2500);
      }
    } else {
      setErrors(validationResult);
      setTimeout(() => {
        setErrors(null);
      }, 2500);
    }
  };

  return (
    <div className="container-register">
      <div className="d-flex title flex-row align-items-md-center">
        <img
          src="https://www.arcetec.com.co/wp-content/uploads/2022/05/Logo_Original.svg"
          className="attachment-large size-large wp-image-6923"
          alt=""
          width={300}
        />
        <a href="/" className="loginLink">
          Login
        </a>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            className={`form-control ${hasEmailError ? "is-invalid" : ""}`}
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Ingrese su correo electrónico"
          />
          {hasEmailError && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            className={`form-control ${hasPasswordError ? "is-invalid" : ""}`}
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Ingrese su contraseña"
          />
          {hasPasswordError && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar contraseña</label>
          <input
            type="password"
            className={`form-control ${
              hasConfirmPassError ? "is-invalid" : ""
            }`}
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Ingrese su contraseña de nuevo"
          />
          {hasConfirmPassError && (
            <div className="invalid-feedback">{errors.confirmPassword}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="name">Nombre completo</label>
          <input
            type="text"
            className={`form-control ${hasNameError ? "is-invalid" : ""}`}
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Ingrese su nombre completo"
          />
          {hasNameError && (
            <div className="invalid-feedback">{errors.name}</div>
          )}
        </div>
        <div className="d-flex">
          <button type="submit" className="btn btn-primary btn-register">
            Registrarse
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => window.history.back()}
          >
            Atras
          </button>
        </div>
        {errors && typeof errors === "string" && (
          <div className="alert alert-danger mt-3">{errors}</div>
        )}
      </form>
    </div>
  );
};

export default Register;
