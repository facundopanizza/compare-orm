import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { TagInputDto } from './dtos/input/tag.input.dto';
import { TagOutputDto } from './dtos/output/tag.output.dto';
import { TagService } from './tag.service';

const TAG_NOT_FOUND = 'Tag not found';

@ApiTags('Tag')
@Controller('tag')
export class TagController {
  constructor(private tagService: TagService) {}

  @ApiCreatedResponse({ type: TagOutputDto })
  @ApiInternalServerErrorResponse()
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createTag(@Body() tag: TagInputDto): Promise<TagOutputDto> {
    try {
      const createdTag = await this.tagService.createTag(tag);
      return plainToInstance(TagOutputDto, createdTag);
    } catch (error) {
      throw error;
    }
  }

  @ApiOkResponse({ type: TagOutputDto })
  @ApiNotFoundResponse({ description: TAG_NOT_FOUND })
  @ApiInternalServerErrorResponse()
  @ApiParam({ name: 'id', required: true })
  @Get(':id')
  async findTagById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TagOutputDto> {
    try {
      const foundTag = await this.tagService.findTagById(id);
      return plainToInstance(TagOutputDto, foundTag);
    } catch (error) {
      throw new NotFoundException(TAG_NOT_FOUND);
    }
  }

  @ApiOkResponse({ type: TagOutputDto })
  @ApiNotFoundResponse({ description: TAG_NOT_FOUND })
  @ApiInternalServerErrorResponse()
  @ApiParam({ name: 'id', required: true })
  @Put(':id')
  async updateTag(
    @Param('id', ParseIntPipe) id: number,
    @Body() tag: TagInputDto,
  ): Promise<TagOutputDto> {
    try {
      const updatedTag = await this.tagService.updateTag(id, tag);
      return plainToInstance(TagOutputDto, updatedTag);
    } catch (error) {
      throw new NotFoundException(TAG_NOT_FOUND);
    }
  }

  @ApiOkResponse({ type: Boolean })
  @ApiNotFoundResponse({ description: TAG_NOT_FOUND })
  @ApiInternalServerErrorResponse()
  @ApiParam({ name: 'id', required: true })
  @Delete(':id')
  async deleteTag(@Param('id', ParseIntPipe) id: number): Promise<true> {
    try {
      await this.tagService.deleteTag(id);
      return true;
    } catch (error) {
      throw new NotFoundException(TAG_NOT_FOUND);
    }
  }
}
