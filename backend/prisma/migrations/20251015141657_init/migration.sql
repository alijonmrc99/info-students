-- DropIndex
DROP INDEX `Student_email_key` ON `Student`;

-- AlterTable
ALTER TABLE `Student` ADD COLUMN `homeroomTeacherId` INTEGER NULL,
    MODIFY `email` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `HomeRoomTeacher` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `HomeRoomTeacher_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_homeroomTeacherId_fkey` FOREIGN KEY (`homeroomTeacherId`) REFERENCES `HomeRoomTeacher`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
