import { PrismaClient, Broken } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

const prisma = new PrismaClient();

type Param = {
  id: number;
};

type Query = {
  limit: number;
  offset: number;
} & Broken;

export async function createBroken(
  req: FastifyRequest<{ Body: Broken }>,
  res: FastifyReply,
) {
  const broken = await prisma.broken.create({
    data: { ...req.body },
    include: {
      rent: true,
      equipment: {
        include: {
          brand: true,
        },
      },
    },
  });

  return res.status(200).send({
    result: "ok",
    data: broken,
  });
}

export async function requestBroken(
  req: FastifyRequest<{ Params: Param; Querystring: Query }>,
  res: FastifyReply,
) {
  const { id } = req.params;
  const { equipmentId, limit, offset } = req.query;

  const broken = id
    ? await prisma.broken.findFirst({
        where: {
          id: id,
        },
        include: {
          rent: true,
          equipment: {
            include: {
              brand: true,
            },
          },
        },
      })
    : await prisma.broken.findMany({
        skip: offset,
        take: limit,
        where: {
          equipmentId: equipmentId,
        },
        include: {
          rent: true,
          equipment: {
            include: {
              brand: true,
            },
          },
        },
        orderBy: {
          id: "desc",
        },
      });

  const count = id ? undefined : await prisma.broken.count();

  return res.status(200).send({
    result: "ok",
    data: broken,
    limit: limit,
    offset: offset,
    total: count,
  });
}

export async function updateBroken(
  req: FastifyRequest<{ Body: Broken; Params: Param }>,
  res: FastifyReply,
) {
  const { id } = req.params;

  const broken = await prisma.broken.update({
    where: {
      id: id,
    },
    data: { ...req.body },
    include: {
      rent: true,
      equipment: {
        include: {
          brand: true,
        },
      },
    },
  });

  return res.status(200).send({
    result: "ok",
    data: broken,
  });
}

export async function deleteBroken(
  req: FastifyRequest<{ Body: Broken; Params: Param }>,
  res: FastifyReply,
) {
  const { id } = req.params;

  const broken = await prisma.broken.delete({
    where: {
      id: id,
    },
    include: {
      rent: true,
      equipment: {
        include: {
          brand: true,
        },
      },
    },
  });

  return res.status(200).send({
    result: "ok",
    data: broken,
  });
}
