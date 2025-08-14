-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `hashed_password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `books` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `genre` ENUM('NOVEL', 'MYSTERY', 'HISTORY', 'PROGRAMMING', 'SCIENCE', 'FANTASY', 'ROMANCE', 'BIOGRAPHY', 'HORROR', 'SCIENCE_FICTION', 'POETRY', 'THRILLER', 'PSYCHOLOGICAL') NOT NULL,
    `user_id` INTEGER NOT NULL,
    `owned` BOOLEAN NOT NULL,
    `read_status` ENUM('WANT_TO_READ', 'reading', 'FINISHED') NOT NULL,
    `starred` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `books` ADD CONSTRAINT `books_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
