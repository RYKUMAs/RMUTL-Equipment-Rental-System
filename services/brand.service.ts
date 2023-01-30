import { Brand, PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

const prisma = new PrismaClient();

type Param = {
  id: number;
};

type Query = {
  limit: number;
  offset: number;
} & Brand;

export async function createBrand(
  req: FastifyRequest<{ Body: Brand }>,
  res: FastifyReply,
) {
  const brand = await prisma.brand.create({
    data: { ...req.body },
  });

  return res.status(200).send({
    result: "ok",
    data: brand,
  });
}

export async function requestBrand(
  req: FastifyRequest<{ Params: Param; Querystring: Query }>,
  res: FastifyReply,
) {
  const { id } = req.params;
  const { name, limit, offset } = req.query;

  const group = id
    ? await prisma.brand.findFirst({
      where: {
        id: id,
      },
    })
    : await prisma.brand.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      skip: offset,
      take: limit,
    });

  const count = id ? undefined : await prisma.brand.count({
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

export async function updateBrand(
  req: FastifyRequest<{ Body: Brand; Params: Param }>,
  res: FastifyReply,
) {
  const { id } = req.params;

  const brand = await prisma.brand.update({
    where: {
      id: id,
    },
    data: { ...req.body },
  });

  return res.status(200).send({
    result: "ok",
    data: brand,
  });
}

export async function deleteBrand(
  req: FastifyRequest<{ Body: Brand; Params: Param }>,
  res: FastifyReply,
) {
  const { id } = req.params;

  const brand = await prisma.brand.delete({
    where: {
      id: id,
    },
  });

  return res.status(200).send({
    result: "ok",
    data: brand,
  });
}
