/** @format */

import { FastifyInstance } from "fastify";
import ShortUniqueId from "short-unique-id";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function betRoutes(fastify: FastifyInstance) {
  fastify.get("/bet/total", async () => {
    const total = await prisma.bet.count();
    return { total };
  });

  fastify.post("/bet", async (request, reply) => {
    const createBetBody = z.object({
      title: z.string(),
    });

    const { title } = createBetBody.parse(request.body);

    const generate = new ShortUniqueId({ length: 6 });
    const code = String(generate()).toUpperCase();

    await prisma.bet.create({
      data: {
        title,
        code,
      },
    });

    return reply.status(201).send({ code });
  });
}
