import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateBookDTO } from './dto/create-book.dto';
import { BooksService } from './books.service';
import { UpdateBookDTO } from './dto/update-book.dto';

@Controller('user/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body(ValidationPipe) createBookDTO: CreateBookDTO) {
    return this.booksService.create(createBookDTO);
  }

  @Get()
  findAll(
    @Query('starred', new ParseBoolPipe({ optional: true })) starred?: boolean,
  ) {
    return this.booksService.findAll(starred);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateBookDTO: UpdateBookDTO,
  ) {
    return this.booksService.update(id, updateBookDTO);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.delete(id);
  }
}
