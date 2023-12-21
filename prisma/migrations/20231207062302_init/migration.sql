/*
  Warnings:

  - Added the required column `videoNewsId` to the `Bookmark` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bookmark` ADD COLUMN `videoNewsId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Bookmark` ADD CONSTRAINT `Bookmark_videoNewsId_fkey` FOREIGN KEY (`videoNewsId`) REFERENCES `VideoNews`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
