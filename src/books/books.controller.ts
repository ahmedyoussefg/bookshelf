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
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { BooksService } from './books.service';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import type { Request } from 'express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('user/books')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@ApiUnauthorizedResponse({ description: 'Unauthorized access' })
@ApiBadRequestResponse({
  description: 'When request has invalid parameter/request body',
})
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Book Created' })
  async create(
    @Req() req: Request,
    @Body(ValidationPipe) createBookDto: CreateBookDto,
  ) {
    return await this.booksService.create(createBookDto, req.user!.id);
  }

  @Get()
  @ApiOkResponse({ description: 'Found All Books of Current User' })
  async findAll(
    @Req() req: Request,
    @Query('starred', new ParseBoolPipe({ optional: true })) starred?: boolean,
  ) {
    return await this.booksService.findAll(req.user!.id, starred);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Updated Book' })
  @ApiNotFoundResponse({ description: 'No book with that ID' })
  async update(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateBookDto: UpdateBookDto,
  ) {
    return await this.booksService.update(id, updateBookDto, req.user!.id);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Deleted the book with that ID' })
  @ApiNotFoundResponse({ description: 'No book with that ID' })
  async delete(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    return await this.booksService.delete(id, req.user!.id);
  }
}
