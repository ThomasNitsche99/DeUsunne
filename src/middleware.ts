export { default } from "next-auth/middleware";

export const config = { matcher: ["/api", "/profile", "/statistics","/home"]};
