import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Genre, ReadStatus } from 'src/generated/prisma';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsEnum(Genre)
  genre: Genre;

  @IsBoolean()
  owned: boolean;

  @IsEnum(ReadStatus)
  readStatus: ReadStatus;

  @IsBoolean()
  starred: boolean; // whether the user loved the book or not
}
