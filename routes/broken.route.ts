import { FastifyInstance } from "fastify";
import {
  createBroken,
  deleteBroken,
  requestBroken,
  updateBroken,
} from "../services/broken.service";

export default async function router(server: FastifyInstance) {
  server.post("/api/broken", {
    handler: createBroken,
    schema: {
      body: {
        type: "object",
        required: ["equipmentId", "count"],
        properties: {
          equipmentId: { type: "number" },
          count: { type: "number" },
          status: { type: "string", enum: ["pending", "fixed"] },
          rentId: { type: "number" },
        },
        additionalProperties: false,
      },
    },
  });

  server.get("/api/broken", {
    handler: requestBroken,
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

  server.get("/api/broken/:id", {
    handler: requestBroken,
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "number", minimum: 1 },
        },
      },
    },
  });

  server.put("/api/broken/:id", {
    handler: updateBroken,
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
          equipmentId: { type: "number" },
          count: { type: "number" },
          status: { type: "string", enum: ["pending", "fixed"] },
          rentId: { type: "number" },
        },
        additionalProperties: false,
      },
    },
  });

  server.delete("/api/broken/:id", {
    handler: deleteBroken,
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
