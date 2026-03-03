import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";

function Login() {
  const dispatch = useDispatch();

  const handleLogin = () => {
    // Placeholder login
    dispatch(login({ id: 1, name: "Test User" }));
  };

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;