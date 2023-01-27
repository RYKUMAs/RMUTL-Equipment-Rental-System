import { FastifyInstance } from "fastify";
import {
  createReturn,
  deleteReturn,
  requestReturn,
  updateReturn,
} from "../services/return.service";

export default async function router(server: FastifyInstance) {
  server.post("/api/return", {
    handler: createReturn,
    schema: {
      body: {
        type: "object",
        required: ["rentId"],
        properties: {
          rentId: { type: "number", minimum: 1 },
        },
      },
    },
  });

  server.get("/api/return", {
    handler: requestReturn,
    schema: {
      querystring: {
        type: "object",
        properties: {
          limit: { type: "number", default: 20 },
          offset: { type: "number", default: 0 },
        },
      },
    },
  });

  server.get("/api/return/:id", {
    handler: requestReturn,
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "number", minimum: 1 },
        },
      },
    },
  });

  server.put("/api/return/:id", {
    handler: updateReturn,
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
          rentId: { type: "number", minimum: 1 },
        },
        additionalProperties: false,
      },
    },
  });

  server.delete("/api/return/:id", {
    handler: deleteReturn,
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "number", minimum: 1 },
        },
      },
    },
  });
}
