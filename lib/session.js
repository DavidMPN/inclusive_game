import { withIronSession } from "next-iron-session";

export default function withSession(handler) {
  return withIronSession(handler, {
    password: "eJknXgJKPFunsG7phB4TQmU6BgZsYiJh",
    cookieName: "forall_userdata",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
  });
}