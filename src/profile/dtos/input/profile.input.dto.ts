import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProfileInputDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  bio: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  avatar: string;

  @ApiProperty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsInt()
  @IsNotEmpty()
  userId: number;
}
