import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  JWT_SECRET: z.string(),
  DATABASE_URL: z.string()
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  throw new Error(`x invalid environment variables. ${JSON.stringify(_env.error.format())}`);
}

export const env = _env.data;
