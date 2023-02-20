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
      broken: true,
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
  const { userId, limit, offset } = req.query;

  const rent = id
    ? await prisma.rent.findFirst({
        where: {
          id: id,
        },
        include: {
          user: true,
          return: true,
          broken: true,
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
        where: {
          userId: userId,
        },
        include: {
          user: true,
          return: true,
          broken: true,
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
      broken: true,
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
      broken: true,
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

export async function getStatistic(
  req: FastifyRequest<{ Querystring: { last: number; equipment: string } }>,
  res: FastifyReply,
) {
  const { last, equipment } = req.query;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const result = [];
  const date = new Date();

  for (let i = 0; i < last; i++) {
    let month = date.getMonth() - i;
    let year = date.getFullYear();

    if (month < 0) {
      year--;
      month = 12 + month;
    }

    const data = await prisma.rent.aggregate({
      _count: true,
      where: {
        date: {
          gte: new Date(year, month, 1),
          lte: new Date(year, month + 1, 0),
        },
        equipment: {
          name: equipment,
        },
      },
    });

    result.push({ month: months[month], year: year, count: data._count });
  }

  res.status(200).send({
    result: "ok",
    data: result,
  });
}
