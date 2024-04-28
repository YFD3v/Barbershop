/*
  Warnings:

  - A unique constraint covering the columns `[ownerId]` on the table `Barbershop` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Barbershop" ADD COLUMN     "ownerId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Barbershop_ownerId_key" ON "Barbershop"("ownerId");

-- AddForeignKey
ALTER TABLE "Barbershop" ADD CONSTRAINT "Barbershop_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
