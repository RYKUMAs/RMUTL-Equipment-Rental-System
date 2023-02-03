import authHook from "../hooks/auth.hook";
import authService from "../services/auth.service";
import { FastifyInstance } from "fastify";

export default async function router(instance: FastifyInstance) {
  const { authCheck } = authHook(instance);
  const { signIn, signOut } = authService(instance);

  instance.post("/auth/sign-in", {
    handler: signIn,
    schema: {
      body: {
        type: "object",
        required: ["username", "password"],
        properties: {
          username: { type: "string" },
          password: { type: "string" },
        },
      },
    },
  });

  instance.get("/auth/check", {
    handler: authCheck,
  });

  instance.post("/auth/sign-out", {
    handler: signOut,
  });
}
