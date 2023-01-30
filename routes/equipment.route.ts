import { FastifyInstance } from "fastify";
import {
  createEquipment,
  deleteEquipment,
  requestEquipment,
  updateEquipment,
} from "../services/equipment.service";

export default async function router(server: FastifyInstance) {
  server.post("/api/equipment", {
    handler: createEquipment,
    schema: {
      body: {
        type: "object",
        required: ["name", "count", "model", "remain", "broken","brandId"],
        properties: {
          name: { type: "string" },
          count: { type: "number", minimum: 0 },
          remain: { type: "number", minimum: 0, default: 0 },
          broken: { type: "number", minimum: 0, default: 0 },
          model: { type: "string" },
          brandId: { type: "number", minimum: 1 },
        },
        additionalProperties: false,
      },
    },
  });

  server.get("/api/equipment", {
    handler: requestEquipment,
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

  server.get("/api/equipment/:id", {
    handler: requestEquipment,
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "number", minimum: 1 },
        },
      },
    },
  });

  server.put("/api/equipment/:id", {
    handler: updateEquipment,
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
          count: { type: "number", minimum: 0 },
          remain: { type: "number", minimum: 0, default: 0 },
          broken: { type: "number", minimum: 0, default: 0 },
          model: { type: "string" },
          brandId: { type: "number", minimum: 1 },
        },
        additionalProperties: false,
      },
    },
  });

  server.delete("/api/equipment/:id", {
    handler: deleteEquipment,
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
