/** @format */

import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function guessRoutes(fastify: FastifyInstance) {
  fastify.get("/guess/total", async () => {
    const total = await prisma.guess.count();
    return { total };
  });
}
