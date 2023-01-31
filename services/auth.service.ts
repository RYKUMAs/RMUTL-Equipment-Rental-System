import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export default (instance: FastifyInstance) => {
  return {
    isAuth: async (
      req: FastifyRequest,
      res: FastifyReply,
    ) => {
      let token: string = "";

      if (req.headers.authorization?.split(" ")[0] === "Bearer") {
        token = req.headers.authorization?.split(" ")[1];
      }

      if (req.cookies.session) {
        token = req.cookies.session;
      }

      if (token) {
        try {
          const user = instance.jwt.verify(token);
          return res.status(200).send({
            result: "ok",
            data: {
              isAuthenticate: true,
              user: user,
            },
          });
        } catch (e) {
          console.log(e);
        }
      }

      return res.status(200).send({
        result: "ok",
        data: {
          isAuthenticate: false,
        }
      });
    },
    signOut: async (
      req: FastifyRequest,
      res: FastifyReply,
    ) => {
      return res
        .status(200)
        .clearCookie("session")
        .send({
          result: "ok",
        });
    },

    signIn: async (
      req: FastifyRequest<{ Body: User }>,
      res: FastifyReply,
    ) => {
      const user = await prisma.user.findFirst({
        where: {
          username: req.body.username,
        },
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
              },
            });
        } catch (e) {
          console.log(e);
        }
      }

      res.status(401).send({
        result: "error",
        message: "unauthorized",
      });
    },
  };
};
