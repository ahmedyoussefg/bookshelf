import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Genre, ReadStatus } from 'src/generated/prisma';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  author: string;

  @IsEnum(Genre)
  @ApiProperty()
  genre: Genre;

  @IsBoolean()
  @ApiProperty()
  owned: boolean;

  @IsEnum(ReadStatus)
  @ApiProperty()
  readStatus: ReadStatus;

  @IsBoolean()
  @ApiProperty()
  starred: boolean; // whether the user loved the book or not
}
