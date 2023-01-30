import { Equipment, PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

const prisma = new PrismaClient();

type Param = {
  id: number;
};

type Query = {
  limit: number;
  offset: number;
} & Equipment;

export async function createEquipment(
  req: FastifyRequest<{ Body: Equipment }>,
  res: FastifyReply,
) {
  const equipment = await prisma.equipment.create({
    data: { ...req.body },
  });

  return res.status(200).send({
    result: "ok",
    data: equipment,
  });
}

export async function requestEquipment(
  req: FastifyRequest<{ Params: Param; Querystring: Query }>,
  res: FastifyReply,
) {
  const { id } = req.params;
  const { name, limit, offset } = req.query;

  const group = id
    ? await prisma.equipment.findFirst({
      where: {
        id: id,
      },
    })
    : await prisma.equipment.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      skip: offset,
      take: limit,
    });

  const count = id ? undefined : await prisma.equipment.count({
    where: {
      name: {
        contains: name,
      },
    },
  });

  return res.status(200).send({
    result: "ok",
    data: group,
    limit: limit,
    offset: offset,
    total: count,
  });
}

export async function updateEquipment(
  req: FastifyRequest<{ Body: Equipment; Params: Param }>,
  res: FastifyReply,
) {
  const { id } = req.params;

  const equipment = await prisma.equipment.update({
    where: {
      id: id,
    },
    data: { ...req.body },
  });

  return res.status(200).send({
    result: "ok",
    data: equipment,
  });
}

export async function deleteEquipment(
  req: FastifyRequest<{ Body: Equipment; Params: Param }>,
  res: FastifyReply,
) {
  const { id } = req.params;

  const equipment = await prisma.equipment.delete({
    where: {
      id: id,
    },
  });

  return res.status(200).send({
    result: "ok",
    data: equipment,
  });
}
