import authService from "../services/auth.service";
import { FastifyInstance } from "fastify";

export default async function router(instance: FastifyInstance) {
  const { signIn } = authService(instance);

  instance.post("/sign-in", {
    handler: signIn,
    schema: {
      body: {
        type: "object",
        required: ["username", "password"],
        properties: {
          username: { type: "string" },
          password: { type: "string" }
        }
      }
    }
  })
}