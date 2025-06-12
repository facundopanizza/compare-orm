import { ApiProperty } from '@nestjs/swagger';

export class PostInputDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  userId: number;
}
