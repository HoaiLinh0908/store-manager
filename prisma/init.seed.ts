import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const roles = await prisma.storePermission.createMany({
    data: [{ name: 'Admin' }, { name: 'Member' }, { name: 'Reader' }],
  });

  console.log(`Init store permissions: ${roles}`);
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
