import { ApiProperty } from '@nestjs/swagger';

export class CommentInputDto {
  @ApiProperty()
  content: string;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  postId: number;
}
