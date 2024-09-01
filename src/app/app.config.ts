import { registerAs } from "@nestjs/config";

export const appConfig = registerAs("app", () => ({
  name: process.env.APP_NAME || "My Bun app",
  host: process.env.APP_HOST || "localhost",
  port: parseInt(process.env.APP_PORT!, 10) || 3000,
}));
