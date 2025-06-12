import { ApiProperty } from '@nestjs/swagger';

export class ProfileOutputDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: false })
  bio?: string;

  @ApiProperty({ required: false })
  avatar?: string;

  @ApiProperty()
  userId: number;
}
