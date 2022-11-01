/** @format */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@email.com",
      avatarUrl: "https://github.com/dharuanluigi.png",
    },
  });

  const bet = await prisma.bet.create({
    data: {
      title: "Example Bet",
      code: "COD123",
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-02T12:00:00.201Z",
      firstTeamCountryCode: "DE",
      secondTeamCountrCode: "BR",
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-03T12:00:00.201Z",
      firstTeamCountryCode: "AR",
      secondTeamCountrCode: "BR",

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,
          participant: {
            connect: {
              userId_betId: {
                userId: user.id,
                betId: bet.id,
              },
            },
          },
        },
      },
    },
  });
}

main();
