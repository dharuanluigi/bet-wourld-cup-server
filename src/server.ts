/** @format */

import Fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query"],
});

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  fastify.get("/bet/total", async () => {
    const total = await prisma.bet.count();
    return { total };
  });

  await fastify.listen({ port: 3333 });
}

bootstrap();
