/*
  Warnings:

  - You are about to drop the column `featuresAccessId` on the `adminrole` table. All the data in the column will be lost.
  - You are about to drop the `bookmakr` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `adminrole` DROP FOREIGN KEY `AdminRole_featuresAccessId_fkey`;

-- DropForeignKey
ALTER TABLE `bookmakr` DROP FOREIGN KEY `Bookmakr_adminUserId_fkey`;

-- DropForeignKey
ALTER TABLE `bookmakr` DROP FOREIGN KEY `Bookmakr_customerId_fkey`;

-- DropForeignKey
ALTER TABLE `bookmakr` DROP FOREIGN KEY `Bookmakr_newsId_fkey`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_adminUserId_fkey`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_customerId_fkey`;

-- DropForeignKey
ALTER TABLE `news` DROP FOREIGN KEY `News_adminUserId_fkey`;

-- DropForeignKey
ALTER TABLE `news` DROP FOREIGN KEY `News_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `report` DROP FOREIGN KEY `Report_adminUserId_fkey`;

-- DropForeignKey
ALTER TABLE `report` DROP FOREIGN KEY `Report_customerId_fkey`;

-- AlterTable
ALTER TABLE `adminfeatures` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `adminrole` DROP COLUMN `featuresAccessId`;

-- AlterTable
ALTER TABLE `comment` MODIFY `customerId` VARCHAR(191) NULL,
    MODIFY `adminUserId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `news` MODIFY `authorId` VARCHAR(191) NULL,
    MODIFY `adminUserId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `report` MODIFY `customerId` VARCHAR(191) NULL,
    MODIFY `adminUserId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `bookmakr`;

-- CreateTable
CREATE TABLE `AdminSubFeatures` (
    `id` VARCHAR(191) NOT NULL,
    `subFeaturesName` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `featuresId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bookmark` (
    `id` VARCHAR(191) NOT NULL,
    `newsId` VARCHAR(191) NOT NULL,
    `customerId` VARCHAR(191) NOT NULL,
    `adminUserId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AdminSubFeatures` ADD CONSTRAINT `AdminSubFeatures_featuresId_fkey` FOREIGN KEY (`featuresId`) REFERENCES `AdminFeatures`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `News` ADD CONSTRAINT `News_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `Customer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `News` ADD CONSTRAINT `News_adminUserId_fkey` FOREIGN KEY (`adminUserId`) REFERENCES `AdminUser`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_adminUserId_fkey` FOREIGN KEY (`adminUserId`) REFERENCES `AdminUser`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_adminUserId_fkey` FOREIGN KEY (`adminUserId`) REFERENCES `AdminUser`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bookmark` ADD CONSTRAINT `Bookmark_newsId_fkey` FOREIGN KEY (`newsId`) REFERENCES `News`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bookmark` ADD CONSTRAINT `Bookmark_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bookmark` ADD CONSTRAINT `Bookmark_adminUserId_fkey` FOREIGN KEY (`adminUserId`) REFERENCES `AdminUser`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
