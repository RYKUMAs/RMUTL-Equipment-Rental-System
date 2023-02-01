import { FastifyInstance } from "fastify";
import {
  createUser,
  deleteUser,
  requestUser,
  updateUser,
} from "../services/user.service";

export default async (server: FastifyInstance) => {
  server.post("/api/user", {
    handler: createUser,
    schema: {
      body: {
        type: "object",
        required: ["username"],
        properties: {
          username: { type: "string" },
          password: { type: "string" },
          detail: {
            type: "object",
            properties: {
              id: { type: "string" },
              firstname: { type: "string" },
              lastname: { type: "string" },
            },
          },
        },
      },
    },
  });

  server.get("/api/user", {
    handler: requestUser,
    schema: {
      querystring: {
        type: "object",
        properties: {
          username: { type: "string" },
          limit: { type: "number", default: 20 },
          offset: { type: "number", default: 0 },
        },
      },
    },
  });

  server.get("/api/user/:id", {
    handler: requestUser,
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "number", minimum: 1 },
        },
      },
    },
  });

  server.put("/api/user/:id", {
    handler: updateUser,
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "number", minimum: 1 },
        },
      },
      body: {
        type: "object",
        properties: {
          username: { type: "string" },
        },
      },
    },
  });

  server.delete("/api/user/:id", {
    handler: deleteUser,
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "number", minimum: 1 },
        },
      },
    },
  });
};
