import { FastifyInstance } from "fastify";
import {
  createBrand,
  deleteBrand,
  requestBrand,
  updateBrand,
} from "../services/brand.service";

export default async function router(server: FastifyInstance) {
  server.post("/api/brand", {
    handler: createBrand,
    schema: {
      body: {
        type: "object",
        required: ["name"],
        properties: {
          name: { type: "string" },
        },
        additionalProperties: false,
      },
    },
  });

  server.get("/api/brand", {
    handler: requestBrand,
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

  server.get("/api/brand/:id", {
    handler: requestBrand,
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "number", minimum: 1 },
        },
      },
    },
  });

  server.put("/api/brand/:id", {
    handler: updateBrand,
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
          name: { type: "string" },
        },
        additionalProperties: false,
      },
    },
  });

  server.delete("/api/brand/:id", {
    handler: deleteBrand,
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
