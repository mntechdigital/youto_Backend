-- DropForeignKey
ALTER TABLE `bookmark` DROP FOREIGN KEY `Bookmark_adminUserId_fkey`;

-- DropForeignKey
ALTER TABLE `bookmark` DROP FOREIGN KEY `Bookmark_newsId_fkey`;

-- DropForeignKey
ALTER TABLE `bookmark` DROP FOREIGN KEY `Bookmark_videoNewsId_fkey`;

-- AlterTable
ALTER TABLE `bookmark` MODIFY `newsId` VARCHAR(191) NULL,
    MODIFY `videoNewsId` VARCHAR(191) NULL,
    MODIFY `adminUserId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Bookmark` ADD CONSTRAINT `Bookmark_newsId_fkey` FOREIGN KEY (`newsId`) REFERENCES `News`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bookmark` ADD CONSTRAINT `Bookmark_videoNewsId_fkey` FOREIGN KEY (`videoNewsId`) REFERENCES `VideoNews`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bookmark` ADD CONSTRAINT `Bookmark_adminUserId_fkey` FOREIGN KEY (`adminUserId`) REFERENCES `AdminUser`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
