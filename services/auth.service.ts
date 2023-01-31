import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export default (instance: FastifyInstance) => {
  return {
    signIn: async (
      req: FastifyRequest<{Body: User}>,
      res: FastifyReply,
    ) => {
      const user = await prisma.user.findFirst({
        where: {
          username: req.body.username,
        }
      });

      if (user && user.password == req.body.password) {
        try {
          const token = instance.jwt.sign(user);

          return res
            .status(200)
            .cookie("session", token)
            .send({
              result: "ok",
              data: {
                user: user,
                token: token,
              }
            });
        } catch (e) {
          console.log(e);
        }
      }

      res.status(401).send({
        result: "error",
        message: "unauthorized",
      });
    }
  }
}