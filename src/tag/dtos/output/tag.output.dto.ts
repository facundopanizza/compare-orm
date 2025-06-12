import { ApiProperty } from '@nestjs/swagger';

export class TagOutputDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
