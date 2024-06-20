/*
  Warnings:

  - You are about to drop the column `storePermissionId` on the `StoresOnUsers` table. All the data in the column will be lost.
  - Added the required column `status` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `permission` to the `StoresOnUsers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "StoresOnUsers" DROP CONSTRAINT "StoresOnUsers_storeId_fkey";

-- DropForeignKey
ALTER TABLE "StoresOnUsers" DROP CONSTRAINT "StoresOnUsers_storePermissionId_fkey";

-- DropForeignKey
ALTER TABLE "StoresOnUsers" DROP CONSTRAINT "StoresOnUsers_userId_fkey";

-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StoresOnUsers" DROP COLUMN "storePermissionId",
ADD COLUMN     "permission" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "StoresOnUsers" ADD CONSTRAINT "StoresOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoresOnUsers" ADD CONSTRAINT "StoresOnUsers_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
