import { FastifyInstance } from "fastify";
import {
  createRent,
  deleteRent,
  requestRent,
  updateRent,
} from "../services/rent.service";

export default async function router(server: FastifyInstance) {
  server.post("/api/rent", {
    handler: createRent,
    schema: {
      body: {
        type: "object",
        required: ["userId", "equipmentId"],
        properties: {
          userId: { type: "number", minimum: 1 },
          equipmentId: { type: "number", minimum: 1 },
        },
        additionalProperties: false,
      },
    },
  });

  server.get("/api/rent", {
    handler: requestRent,
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

  server.get("/api/rent/:id", {
    handler: requestRent,
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "number", minimum: 1 },
        },
      },
    },
  });

  server.put("/api/rent/:id", {
    handler: updateRent,
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
          userId: { type: "number", minimum: 1 },
          equipmentId: { type: "number", minimum: 1 },
        },
        additionalProperties: false,
      },
    },
  });

  server.delete("/api/rent/:id", {
    handler: deleteRent,
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
