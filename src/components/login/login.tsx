import axios from 'axios';
import React, { useState } from 'react';

const Login = () => {
  const handlerLogin = async () => {
    try {
      const response = await axios.post(
        'http://api.alikooshesh.ir:3000/api/users/login',
        { email: email, password: password },
        { headers: { api_key: 'siashoppanel' } }
      );
      if (response.status === 200) {
        localStorage.setItem("accessToken" , response.data.accessToken)
        window.location.href = "/admin"
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [email, setEmail] = useState('sianami123@gmail.com');
  const [password, setPassword] = useState('123456789');

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <input
        className="border border-black"
        onChange={e => {
          setEmail(e.target.value);
        }}
        value={email}
        type="text"
      />
      <input
        className="border border-black"
        onChange={e => {
          setPassword(e.target.value);
        }}
        value={password}
        type="text"
      />
      <button className="bg-blue-300 p-2" onClick={handlerLogin}>
        Log in
      </button>
    </div>
  );
};

export default Login;
