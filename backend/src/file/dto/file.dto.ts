import { IsString, IsNumber } from 'class-validator';

export class FileDto {
  @IsString()
  username: string;

  @IsString()
  repo_name: string;

  @IsString()
  language: string;

  @IsNumber()
  stars: number;
}
