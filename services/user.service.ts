import { PrismaClient, User } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

const prisma = new PrismaClient();

type Query = {
  limit: number;
  offset: number;
} & User;

type Param = {
  id: number;
};

export async function createUser(
  req: FastifyRequest<{ Body: User }>,
  res: FastifyReply,
) {
  const user = await prisma.user.create({
    data: { ...req.body },
  });

  return res.status(200).send({
    result: "ok",
    data: user,
  });
}

export async function requestUser(
  req: FastifyRequest<{ Params: Param; Querystring: Query }>,
  res: FastifyReply,
) {
  const { id } = req.params;
  const { username, limit, offset } = req.query;

  const user = id
    ? await prisma.user.findFirst({
      where: {
        id: id,
      },
    })
    : await prisma.user.findMany({
      where: {
        username: {
          contains: username,
        },
      },
      skip: offset,
      take: limit,
    });
  const count = id ? null : await prisma.user.count({
    where: {
      username: {
        contains: username,
      },
    },
  });
  return res.status(200).send({
    result: "ok",
    data: user,
    limit: limit,
    offset: offset,
    total: count,
  });
}

export async function updateUser(
  req: FastifyRequest<{ Params: Param; Body: User }>,
  res: FastifyReply,
) {
  const { id } = req.params;

  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: { ...req.body },
  });

  return res.status(200).send({
    result: "ok",
    data: user,
  });
}

export async function deleteUser(
  req: FastifyRequest<{ Params: Param }>,
  res: FastifyReply,
) {
  const { id } = req.params;

  const user = await prisma.user.delete({
    where: {
      id: id,
    },
  });

  return res.status(200).send({
    result: "ok",
    data: user,
  });
}
