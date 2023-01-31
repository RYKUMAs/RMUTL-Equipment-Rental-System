import { FastifyInstance } from "fastify";

export default (instance: FastifyInstance) => {
  return {
    authUser: async (request: any, reply: any, done: any) => {
      let token: string = "";

      if (request.headers.authorization?.split(" ")[0] === "Bearer") {
        token = request.headers.authorization?.split(" ")[1];
      }

      if (request.cookies.session) {
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
        reply.status(401).send({
          result: "error",
          message: "unauthorized access",
        });
      }
    },

    authRole: (role: string) => {
      return (request: any, reply: any, done: any) => {
        if (request.user?.role == role) {
          return reply.status(403).send({
            result: "error",
            message: "forbidden access",
          });
        }
        done();
      };
    },
  };
};
