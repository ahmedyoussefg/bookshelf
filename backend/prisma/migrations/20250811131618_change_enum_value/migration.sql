/*
  Warnings:

  - The values [reading] on the enum `books_read_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `books` MODIFY `read_status` ENUM('WANT_TO_READ', 'READING', 'FINISHED') NOT NULL;
