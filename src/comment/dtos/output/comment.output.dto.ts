import { ApiProperty } from '@nestjs/swagger';

export class CommentOutputDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  content: string;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  postId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
