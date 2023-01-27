import { PrismaClient, Return } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

const prisma = new PrismaClient();

type Param = {
  id: number;
};

type Query = {
  limit: number;
  offset: number;
} & Return;

export async function createReturn(
  req: FastifyRequest<{ Body: Return }>,
  res: FastifyReply,
) {
  const data = await prisma.return.create({
    data: { ...req.body },
  });

  return res.status(200).send({
    result: "ok",
    data: data,
  });
}

export async function requestReturn(
  req: FastifyRequest<{ Params: Param; Querystring: Query }>,
  res: FastifyReply,
) {
  const { id } = req.params;
  const { limit, offset } = req.query;

  const data = id
    ? await prisma.return.findFirst({
      where: {
        id: id,
      },
    })
    : await prisma.return.findMany({
      skip: offset,
      take: limit,
    });

  const count = id ? null : await prisma.return.count();

  return res.status(200).send({
    result: "ok",
    data: data,
    limit: limit,
    offset: offset,
    total: count,
  });
}

export async function updateReturn(
  req: FastifyRequest<{ Body: Return; Params: Param }>,
  res: FastifyReply,
) {
  const { id } = req.params;

  const data = await prisma.return.update({
    where: {
      id: id,
    },
    data: { ...req.body },
  });

  return res.status(200).send({
    result: "ok",
    data: data,
  });
}

export async function deleteReturn(
  req: FastifyRequest<{ Body: Return; Params: Param }>,
  res: FastifyReply,
) {
  const { id } = req.params;

  const data = await prisma.return.delete({
    where: {
      id: id,
    },
  });

  return res.status(200).send({
    result: "ok",
    data: data,
  });
}
