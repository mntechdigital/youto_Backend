/*
  Warnings:

  - You are about to drop the column `image` on the `advertisement` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `advertisement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `advertisement` DROP COLUMN `image`,
    DROP COLUMN `title`,
    ADD COLUMN `primary1Image` TEXT NULL,
    ADD COLUMN `primary2Image` TEXT NULL,
    ADD COLUMN `secondary1` TEXT NULL,
    ADD COLUMN `secondary2` TEXT NULL,
    ADD COLUMN `tertiary1` TEXT NULL,
    ADD COLUMN `tertiary2` TEXT NULL;
