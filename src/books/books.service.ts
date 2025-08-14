import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { Genre } from './enums/genre.enum';
import { ReadStatus } from './enums/read-status.enum';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  private books = [
    {
      id: 1,
      title: 'Romeo & Juliet',
      author: 'William Shakespear',
      genre: Genre.ROMANCE,
      owned: true,
      starred: false,
      readStatus: ReadStatus.FINISHED,
    },
    {
      id: 2,
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      genre: Genre.FANTASY,
      owned: false,
      starred: true,
      readStatus: ReadStatus.WANT_TO_READ,
    },
    {
      id: 3,
      title: '1984',
      author: 'George Orwell',
      genre: Genre.HISTORY,
      owned: true,
      starred: false,
      readStatus: ReadStatus.READING,
    },
    {
      id: 4,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: Genre.SCIENCE,
      owned: true,
      starred: true,
      readStatus: ReadStatus.FINISHED,
    },
    {
      id: 5,
      title: 'The Martian',
      author: 'Andy Weir',
      genre: Genre.SCIENCE_FICTION,
      owned: false,
      starred: false,
      readStatus: ReadStatus.FINISHED,
    },
    {
      id: 6,
      title: 'The Da Vinci Code',
      author: 'Dan Brown',
      genre: Genre.MYSTERY,
      owned: true,
      starred: true,
      readStatus: ReadStatus.READING,
    },
  ];

  create(createBookDto: CreateBookDto) {
    const highestIdOfBook = [...this.books].sort((a, b) => b.id - a.id)[0].id;
    const newBook = {
      id: highestIdOfBook + 1,
      ...createBookDto,
    };
    this.books.push(newBook);

    return newBook;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    this.books = this.books.map((book) => {
      if (book.id === id) {
        return { ...book, ...updateBookDto };
      }
      return book;
    });

    const updatedBook = this.books.find((book) => book.id === id);
    if (!updatedBook) {
      throw new NotFoundException({
        message: "Book not found or you don't have permission to update it",
      });
    }
    return updatedBook;
  }

  findAll(starred?: boolean) {
    if (starred !== undefined) {
      return this.books.filter((book) => book.starred === starred);
    }
    return this.books;
  }

  delete(id: number) {
    this.books = this.books.filter((book) => book.id !== id);
    // TODO: handle if book doesn't exist
  }
}
