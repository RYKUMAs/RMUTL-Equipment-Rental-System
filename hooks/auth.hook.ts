import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
} from "fastify";

export default (instance: FastifyInstance) => {
  return {
    authCheck: (request: FastifyRequest, reply: FastifyReply) => {
      let token: string | undefined;
      let payload: object | undefined;

      if (request.headers.authorization?.startsWith("Bearer ")) {
        token = request.headers.authorization?.split(" ")[1];
      } else {
        token = request.cookies.session;
      }

      if (token) {
        try {
          payload = instance.jwt.verify(token) as object;
        } catch (e) {
          console.log(e);
        }
      }

      if (payload) {
        reply.code(200).send({
          result: "success",
          isAuthenticated: true,
          user: payload,
        });
      } else {
        reply.code(200).send({
          result: "success",
          isAuthenticated: false,
        });
      }
    },

    authUser: async (
      request: FastifyRequest,
      reply: FastifyReply,
      done: HookHandlerDoneFunction,
    ) => {
      let token: string | undefined;

      if (request.headers.authorization?.startsWith("Bearer ")) {
        token = request.headers.authorization?.split(" ")[1];
      } else {
        token = request.cookies.session;
      }

      if (token) {
        try {
          request.user = await instance.jwt.verify(token);
          done();
        } catch (e) {
          console.log(e);
        }
      }

      if (!request.user) {
        reply.code(401).send({
          result: "error",
          message: "Unauthorized.",
        });
      }
    },

    authRole: (role: string) => {
      return (
        request: FastifyRequest,
        reply: FastifyReply,
        done: HookHandlerDoneFunction,
      ) => {
        if ((request.user as any).role == role) {
          return reply.code(403).send({
            result: "error",
            message: "Forbidden.",
          });
        }
        done();
      };
    },
  };
};
