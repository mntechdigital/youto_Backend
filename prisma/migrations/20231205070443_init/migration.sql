-- DropForeignKey
ALTER TABLE `adminfeatures` DROP FOREIGN KEY `AdminFeatures_adminRoleId_fkey`;

-- DropForeignKey
ALTER TABLE `adminuser` DROP FOREIGN KEY `AdminUser_roleId_fkey`;

-- AlterTable
ALTER TABLE `adminfeatures` MODIFY `adminRoleId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `adminuser` MODIFY `roleId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `AdminUser` ADD CONSTRAINT `AdminUser_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `AdminRole`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AdminFeatures` ADD CONSTRAINT `AdminFeatures_adminRoleId_fkey` FOREIGN KEY (`adminRoleId`) REFERENCES `AdminRole`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
