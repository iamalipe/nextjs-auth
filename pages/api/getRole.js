/* eslint-disable import/no-anonymous-default-export */
import { verify } from "jsonwebtoken";
import { serialize } from "cookie";

export default async function (req, res) {
  const { cookies } = req;
  const jwt = cookies.token;
  try {
    const isValid = verify(jwt, process.env.SECRET);
    return res.json({ username: isValid.username, role: isValid.role });
  } catch (err) {
    const serialised = serialize("token", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    });
    res.setHeader("Set-Cookie", serialised);
    return res.status(401).json({ message: "Unauthorized, Invalid token!" });
  }
}
