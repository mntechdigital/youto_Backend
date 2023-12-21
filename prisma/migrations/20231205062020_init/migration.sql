/*
  Warnings:

  - You are about to drop the column `created_at` on the `adminrole` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `adminsubfeatures` table. All the data in the column will be lost.
  - Added the required column `adminRoleId` to the `AdminFeatures` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `adminfeatures` ADD COLUMN `adminRoleId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `adminrole` DROP COLUMN `created_at`;

-- AlterTable
ALTER TABLE `adminsubfeatures` DROP COLUMN `created_at`;

-- AddForeignKey
ALTER TABLE `AdminFeatures` ADD CONSTRAINT `AdminFeatures_adminRoleId_fkey` FOREIGN KEY (`adminRoleId`) REFERENCES `AdminRole`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
