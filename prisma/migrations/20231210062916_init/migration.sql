-- AlterTable
ALTER TABLE `news` ADD COLUMN `shareCount` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `videonews` ADD COLUMN `shareCount` INTEGER NOT NULL DEFAULT 0;
