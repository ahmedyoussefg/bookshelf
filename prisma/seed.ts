import { faker } from '@faker-js/faker';
import { Genre, PrismaClient, ReadStatus } from '../src/generated/prisma';

const prisma = new PrismaClient();

const userIds = [1];

async function main() {
  console.log('Seeding book data...');
  for (const userId of userIds) {
    // delete all books of that user
    await prisma.book.deleteMany({
      where: {
        userId: userId,
      },
    });
    for (let i = 0; i < 30; i++) {
      await prisma.book.create({
        data: {
          userId: userId,
          title: faker.book.title(),
          author: faker.book.author(),
          genre: faker.helpers.enumValue(Genre),
          owned: faker.datatype.boolean(),
          readStatus: faker.helpers.enumValue(ReadStatus),
          starred: faker.datatype.boolean(),
        },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
