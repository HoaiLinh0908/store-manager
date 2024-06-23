import { PrismaClient } from '@prisma/client';
import { storePermissions } from '../src/utils/constants';
const prisma = new PrismaClient();

async function main() {
  //Even though I don't think creating a table for Store Permission is necessary, I did it because this could be a good seeding sample
  const seedData = storePermissions().map((name) => ({ name }));
  await prisma.storePermission.createMany({
    data: seedData,
  });

  console.log(`Init store permissions: ${seedData}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(`Something wrong happened when seeding init data: ${e}`);
    await prisma.$disconnect();
    process.exit(1);
  });
