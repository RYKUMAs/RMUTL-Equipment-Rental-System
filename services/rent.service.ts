import { PrismaClient, Rent } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

const prisma = new PrismaClient();

type Param = {
  id: number;
};

type Query = {
  limit: number;
  offset: number;
} & Rent;

export async function createRent(
  req: FastifyRequest<{ Body: Rent }>,
  res: FastifyReply,
) {
  const rent = await prisma.rent.create({
    data: { ...req.body },
  });

  return res.status(200).send({
    result: "ok",
    data: rent,
  });
}

export async function requestRent(
  req: FastifyRequest<{ Params: Param; Querystring: Query }>,
  res: FastifyReply,
) {
  const { id } = req.params;
  const { limit, offset } = req.query;

  const group = id
    ? await prisma.rent.findFirst({
      where: {
        id: id,
      },
    })
    : await prisma.rent.findMany({
      skip: offset,
      take: limit,
    });

  const count = id ? null : await prisma.equipment.count();

  return res.status(200).send({
    result: "ok",
    data: group,
    limit: limit,
    offset: offset,
    total: count,
  });
}

export async function updateRent(
  req: FastifyRequest<{ Body: Rent; Params: Param }>,
  res: FastifyReply,
) {
  const { id } = req.params;

  const rent = await prisma.rent.update({
    where: {
      id: id,
    },
    data: { ...req.body },
  });

  return res.status(200).send({
    result: "ok",
    data: rent,
  });
}

export async function deleteRent(
  req: FastifyRequest<{ Body: Rent; Params: Param }>,
  res: FastifyReply,
) {
  const { id } = req.params;

  const rent = await prisma.rent.delete({
    where: {
      id: id,
    },
  });

  return res.status(200).send({
    result: "ok",
    data: rent,
  });
}
