import { ApiProperty } from '@nestjs/swagger';

export class TagInputDto {
  @ApiProperty()
  name: string;
}
