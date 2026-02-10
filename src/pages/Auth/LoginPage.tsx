import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../services/auth";
import { setUser } from "../../store/slices/authSlice";
import { regexpValidation } from "../../core/utils/constants";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!regexpValidation.test(password)) {
      setError(
        "Password must be 6-16 chars, include at least 1 number and 1 special character (!@#$%^&*)"
      );
      return;
    }

    try {
      const userCredential = await loginUser(email, password);
      const user = userCredential.user;
      dispatch(setUser({ uid: user.uid, email: user.email }));
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", padding: 16 }}>
      <h2>Login</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", paddingRight: 40 }}
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            style={{
              position: "absolute",
              right: 10,
              top: "65%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            {/* Always open eye icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              width="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 
                       5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
            </svg>
          </span>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
