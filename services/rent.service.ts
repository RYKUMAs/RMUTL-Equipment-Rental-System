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
    include: {
      user: true,
      return: true,
      equipment: {
        include: {
          brand: true,
        },
      },
    },
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

  const rent = id
    ? await prisma.rent.findFirst({
      where: {
        id: id,
      },
      include: {
        user: true,
        return: true,
        equipment: {
          include: {
            brand: true,
          },
        },
      },
    })
    : await prisma.rent.findMany({
      skip: offset,
      take: limit,
      include: {
        user: true,
        return: true,
        equipment: {
          include: {
            brand: true,
          },
        },
      },
    });

  const count = id ? undefined : await prisma.rent.count();

  return res.status(200).send({
    result: "ok",
    data: rent,
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
    include: {
      user: true,
      return: true,
      equipment: {
        include: {
          brand: true,
        },
      },
    },
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
    include: {
      user: true,
      return: true,
      equipment: {
        include: {
          brand: true,
        },
      },
    },
  });

  return res.status(200).send({
    result: "ok",
    data: rent,
  });
}
