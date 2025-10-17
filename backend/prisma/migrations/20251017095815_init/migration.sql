-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_teacherId_fkey`;

-- DropIndex
DROP INDEX `User_teacherId_fkey` ON `User`;

-- AlterTable
ALTER TABLE `User` MODIFY `teacherId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `HomeRoomTeacher`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
