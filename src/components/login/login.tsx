import { useState } from "react";
import { authAPI } from "../../api/api";

const Login = () => {
  const handlerLogin = async () => {
    try {
      const response = await authAPI.login({ email, password });
      if (response.status === 200) {
        localStorage.setItem("accessToken", response.data.accessToken);
        window.location.href = "/products";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [email, setEmail] = useState("sianami123@gmail.com");
  const [password, setPassword] = useState("123456789");

  return (
    <div className="flex flex-col gap-2 justify-center items-center w-full h-screen">
      <input
        className="border border-black rounded-md p-2"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
        type="text"
      />
      <input
        className="border border-black rounded-md p-2"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
        type="text"
      />
      <button className="bg-blue-300 p-2 rounded-md" onClick={handlerLogin}>
        Log in
      </button>
    </div>
  );
};

export default Login;
