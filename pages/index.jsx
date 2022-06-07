import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const mount = async () => {
    try {
      const list = await axios.get("/api/getRole");
      console.log(list.data);
    } catch (err) {
      router.push("/Login");
    }
  };

  useEffect(() => {
    mount();
  }, []);

  const handleGetUser = async () => {
    const user = await axios.get("/api/user");
    console.log(user);
  };

  const handleLogOut = async () => {
    const user = await axios.get("/api/auth/logout");
    console.log(user);
  };
  return (
    <div>
      <h1>This is Home</h1>
      <button onClick={() => handleGetUser()}> User </button>
      <button onClick={() => handleLogOut()}> Logout </button>
    </div>
  );
}
