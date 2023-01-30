/*
  Warnings:

  - You are about to drop the column `brand` on the `Brand` table. All the data in the column will be lost.
  - Added the required column `name` to the `Brand` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Brand` DROP COLUMN `brand`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
