/*
  Warnings:

  - You are about to drop the column `primary1` on the `advertisement` table. All the data in the column will be lost.
  - You are about to drop the column `primary2` on the `advertisement` table. All the data in the column will be lost.
  - You are about to drop the column `secondary1` on the `advertisement` table. All the data in the column will be lost.
  - You are about to drop the column `secondary2` on the `advertisement` table. All the data in the column will be lost.
  - You are about to drop the column `tertiary1` on the `advertisement` table. All the data in the column will be lost.
  - You are about to drop the column `tertiary2` on the `advertisement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `advertisement` DROP COLUMN `primary1`,
    DROP COLUMN `primary2`,
    DROP COLUMN `secondary1`,
    DROP COLUMN `secondary2`,
    DROP COLUMN `tertiary1`,
    DROP COLUMN `tertiary2`,
    ADD COLUMN `image` VARCHAR(191) NULL,
    ADD COLUMN `title` VARCHAR(191) NULL;
