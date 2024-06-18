/*
  Warnings:

  - You are about to drop the `_StoreToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_StoreToUser" DROP CONSTRAINT "_StoreToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_StoreToUser" DROP CONSTRAINT "_StoreToUser_B_fkey";

-- DropTable
DROP TABLE "_StoreToUser";
