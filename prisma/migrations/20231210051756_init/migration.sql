/*
  Warnings:

  - You are about to drop the column `adsImage` on the `advertisement` table. All the data in the column will be lost.
  - Added the required column `primary1` to the `Advertisement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primary2` to the `Advertisement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secondary1` to the `Advertisement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secondary2` to the `Advertisement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tertiary1` to the `Advertisement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tertiary2` to the `Advertisement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `videonews` DROP FOREIGN KEY `VideoNews_adminUserId_fkey`;

-- DropForeignKey
ALTER TABLE `videonews` DROP FOREIGN KEY `VideoNews_authorId_fkey`;

-- AlterTable
ALTER TABLE `advertisement` DROP COLUMN `adsImage`,
    ADD COLUMN `primary1` VARCHAR(191) NOT NULL,
    ADD COLUMN `primary2` VARCHAR(191) NOT NULL,
    ADD COLUMN `secondary1` VARCHAR(191) NOT NULL,
    ADD COLUMN `secondary2` VARCHAR(191) NOT NULL,
    ADD COLUMN `tertiary1` VARCHAR(191) NOT NULL,
    ADD COLUMN `tertiary2` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `videonews` MODIFY `content` LONGTEXT NOT NULL,
    MODIFY `authorId` VARCHAR(191) NULL,
    MODIFY `adminUserId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `VideoNews` ADD CONSTRAINT `VideoNews_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `Customer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VideoNews` ADD CONSTRAINT `VideoNews_adminUserId_fkey` FOREIGN KEY (`adminUserId`) REFERENCES `AdminUser`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
