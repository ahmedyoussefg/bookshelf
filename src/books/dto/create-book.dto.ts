import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Genre } from '../enums/genre.enum';
import { ReadStatus } from '../enums/read-status.enum';

export class CreateBookDTO {
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
