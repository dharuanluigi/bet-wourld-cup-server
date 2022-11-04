/** @format */

import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get("/user/total", async () => {
    const total = await prisma.user.count();
    return { total };
  });
}
