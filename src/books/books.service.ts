import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from 'src/generated/prisma';

@Injectable()
export class BooksService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createBookDto: CreateBookDto, userId: number) {
    const newBook = await this.databaseService.book.create({
      data: {
        ...createBookDto,
        userId: userId,
      },
      omit: {
        userId: true,
      },
    });

    return newBook;
  }

  async findAll(userId: number, starred?: boolean) {
    const whereClause: Prisma.BookWhereInput = {
      userId: userId,
    };
    if (typeof starred === 'boolean') {
      // if not undefined
      whereClause.starred = starred;
    }
    const userBooks = await this.databaseService.book.findMany({
      where: whereClause,
    });
    return userBooks;
  }

  async update(bookId: number, updateBookDto: UpdateBookDto, userId: number) {
    // Filter out undefined values - only include fields that are actually provided
    const dataToUpdate = Object.fromEntries(
      Object.entries(updateBookDto).filter(([, value]) => value !== undefined),
    );

    const updatedBook = await this.databaseService.book.update({
      where: {
        id: bookId,
        userId: userId,
      },
      data: dataToUpdate,
      omit: {
        userId: true,
      },
    });
    return updatedBook;
  }

  async delete(bookId: number, userId: number) {
    await this.databaseService.book.delete({
      where: {
        id: bookId,
        userId: userId,
      },
    });
  }
}
