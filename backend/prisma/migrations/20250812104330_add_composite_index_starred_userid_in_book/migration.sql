-- CreateIndex
CREATE INDEX `books_user_id_starred_idx` ON `books`(`user_id`, `starred`);
