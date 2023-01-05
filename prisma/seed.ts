import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as bcrypt from 'bcrypt';

async function main() {
  await fillTransctionType();
  await createAdmin();
}

async function fillTransctionType() {
  await prisma.transactionType.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      description: 'Venda produtor',
      type: 'IN',
    },
  });
  await prisma.transactionType.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      description: 'Venda afiliado',
      type: 'IN',
    },
  });
  await prisma.transactionType.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      description: 'Comissão paga',
      type: 'OUT',
    },
  });
  await prisma.transactionType.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 4,
      description: 'Comissão recebida',
      type: 'IN',
    },
  });
}

async function createAdmin() {
  const password = await bcrypt.hash('123456', 10);
  await prisma.user.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      id: 1,
      username: 'admin',
      password,
    },
  });
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
