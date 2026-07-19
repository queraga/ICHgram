import { useState } from "react";
import styles from "./LoginPage.module.css";
import { loginUser } from "../../features/auth/api/authApi.ts";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../features/auth/model/authSlice.ts";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const data = await loginUser({
        email,
        password,
      });
      dispatch(login(data.token));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.content}>
        <div className={styles.preview}>
          <img src="/images/mainImage.svg" alt="ICHgram preview" />
        </div>

        <div className={styles.authColumn}>
          <div className={styles.loginCard}>
            <img
              className={styles.logo}
              src="/logo/ichgramLogo.svg"
              alt="ICHgram"
            />

            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                className={styles.input}
                type="email"
                placeholder="Username, or email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />

              <input
                className={styles.input}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />

              <button className={styles.loginButton} type="submit">
                Log in
              </button>
            </form>

            <div className={styles.divider}>
              <span>OR</span>
            </div>

            <a className={styles.forgotPassword} href="#">
              Forgot password?
            </a>
          </div>

          <div className={styles.signupCard}>
            <p>
              Don't have an account?{" "}
              <a className={styles.signupLink} href="/register">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
