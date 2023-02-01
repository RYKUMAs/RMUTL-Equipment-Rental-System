import { PrismaClient, User, UserDetail } from "@prisma/client";
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
  req: FastifyRequest<{ Body: User & { detail: UserDetail } }>,
  res: FastifyReply,
) {
  const userDetail = await prisma.userDetail.create({
    data: {
      id: req.body.detail.id,
      firstname: req.body.detail.firstname,
      lastname: req.body.detail.lastname,
    }
  })

  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: req.body.password,
      type: "STUDENT",
      detailId: userDetail.id
    },
    include: {
      detail: true
    }
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
      include: {
        detail: true
      }
    })
    : await prisma.user.findMany({
      where: {
        username: {
          contains: username,
        },
      },
      include: {
        detail: true,
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
