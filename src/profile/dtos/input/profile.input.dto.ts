import { ApiProperty } from '@nestjs/swagger';

export class ProfileInputDto {
  @ApiProperty({ required: false })
  bio?: string;

  @ApiProperty({ required: false })
  avatar?: string;

  @ApiProperty()
  userId: number;
}
