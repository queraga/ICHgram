import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { register } from "../../features/auth/api/authApi";

import styles from "./RegisterPage.module.css";

export function RegisterPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      setError("");

      await register({
        email,
        fullName,
        username,
        password,
      });

      navigate("/login");
    } catch {
      setError("Registration failed");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <img
            className={styles.logo}
            src="/logo/ichgramLogo.svg"
            alt="ICHgram"
          />

          <h2>Sign up to see photos and videos from your friends.</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
          />

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          {error && <p className={styles.error}>{error}</p>}

          <p className={styles.info}>
            People who use our service may have uploaded your contact
            information to Instagram. <span>Learn More</span>
          </p>

          <p className={styles.info}>
            By signing up, you agree to our <span>Terms</span>,{" "}
            <span>Privacy Policy</span> and <span>Cookies Policy</span>.
          </p>

          <button className={styles.registerButton} onClick={handleRegister}>
            Sign up
          </button>
        </div>

        <div className={styles.loginCard}>
          <span>Have an account?</span>

          <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
}
