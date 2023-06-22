/*
  Warnings:

  - You are about to drop the column `addressId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_addressId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "addressId";
