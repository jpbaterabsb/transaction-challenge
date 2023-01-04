-- CreateEnum
CREATE TYPE "Type" AS ENUM ('IN', 'OUT');

-- CreateTable
CREATE TABLE "TransactionType" (
    "id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "type" "Type" NOT NULL,

    CONSTRAINT "TransactionType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "type" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "product" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "seller" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_type_fkey" FOREIGN KEY ("type") REFERENCES "TransactionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
