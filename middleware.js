export { default } from "next-auth/middleware"

export const config = { matcher: ["/schedule", "/manage/:path*"] }