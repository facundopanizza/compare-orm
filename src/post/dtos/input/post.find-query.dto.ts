import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsArray, IsEnum, Min, Max } from 'class-validator';

export enum PostOrderByField {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  TITLE = 'title',
  USER_ID = 'userId',
}

export enum OrderDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export class PostFindQueryDto {
  @ApiPropertyOptional({ description: 'Text search in title or content' })
  @IsOptional()
  @IsString()
  text?: string;

  @ApiPropertyOptional({ description: 'Filter by userId' })
  @IsOptional()
  @IsNumber()
  userId?: number;

  @ApiPropertyOptional({ description: 'Filter by tags (array of tag IDs)' })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  tags?: number[];

  @ApiPropertyOptional({ enum: PostOrderByField, description: 'Order by field' })
  @IsOptional()
  @IsEnum(PostOrderByField)
  orderBy?: PostOrderByField;

  @ApiPropertyOptional({ enum: OrderDirection, description: 'Order direction' })
  @IsOptional()
  @IsEnum(OrderDirection)
  order?: OrderDirection;

  @ApiPropertyOptional({ description: 'Page number', default: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Items per page', default: 10 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  // Optionally add date range, etc.
}
