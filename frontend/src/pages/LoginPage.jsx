import { useState } from "react";
import { useNavigate } from "react-router";

const GOOGLE_AUTH_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001/auth/google"
    : "/auth/google";

const LoginPage = ({ setAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Demo: Accept any non-empty username/password
    if (username.trim() && password.trim()) {
      setAuthenticated(true);
      navigate("/home");
    } else {
      setError("Please enter your username and password.");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <form className="card bg-base-100 p-8 max-w-md w-full" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <div className="text-error mb-2">{error}</div>}
        <div className="form-control mb-4">
          <label className="label">Username</label>
          <input
            className="input input-bordered"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoFocus
          />
        </div>
        <div className="form-control mb-6">
          <label className="label">Password</label>
          <input
            type="password"
            className="input input-bordered"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary w-full mb-2" type="submit">
          Login
        </button>
        <div className="divider">OR</div>
        <button
          type="button"
          className="btn btn-outline w-full"
          onClick={handleGoogleLogin}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Sign in with Google
        </button>
      </form>
    </div>
  );
};

export default LoginPage;