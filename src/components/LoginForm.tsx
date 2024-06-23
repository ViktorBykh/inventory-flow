import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { login } from "../auth/auth";
import { useNavigate } from "react-router-dom";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    login({ email, password })
      .then((response) => {
        const token = response.token;
        const role = response.role;
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        navigate("/orders");
      })
      .catch(() => {
        setError("Invalid email or password");
      })
      .finally(() => setLoading(false));
  };

  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  const isPasswordValid = password.length >= 8;

  return (
    <>
      <Helmet>
        <title>Login Form</title>
      </Helmet>
      <div className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <h1 className="title">Login Form</h1>
              <form onSubmit={handleLogin}>
                <div className="field">
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className={`input ${isEmailValid ? "is-success" : ""}`}
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                    {isEmailValid && (
                      <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                      </span>
                    )}
                  </div>
                </div>

                <div className="field">
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className={`input ${isPasswordValid ? "is-success" : ""}`}
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock"></i>
                    </span>
                    {isPasswordValid && (
                      <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                      </span>
                    )}
                  </div>
                </div>

                <div className="field is-grouped-right">
                  <div className="control">
                    <button
                      type="submit"
                      className={`button is-link ${loading && "is-loading"}`}
                    >
                      Login
                    </button>
                  </div>
                </div>
                {error && <p className="help is-danger">{error}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
