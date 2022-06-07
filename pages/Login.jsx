import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const mount = async () => {
    try {
      const res = await axios.get("/api/tokenVerify");
      if (res.data.code) router.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    mount();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = { username, password };
    const user = await axios.post("/api/auth/login", credentials);
    console.log(user);
    if (user.status === 200) router.push("/");
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h1>This is Login</h1>
      <label htmlFor="username"> Username </label>
      <input
        type="text"
        name="username"
        id="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <label htmlFor="password"> Username </label>
      <input
        type="text"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button> Log in </button>
    </form>
  );
};

export default Login;
