import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { CommentInputDto } from './dtos/input/comment.input.dto';
import { CommentOutputDto } from './dtos/output/comment.output.dto';
import { CommentService } from './comment.service';

const COMMENT_NOT_FOUND = 'Comment not found';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
    constructor(private commentService: CommentService) { }

    @ApiCreatedResponse({ type: CommentOutputDto })
    @ApiInternalServerErrorResponse()
    @HttpCode(HttpStatus.CREATED)
    @Post()
    async createComment(@Body() comment: CommentInputDto): Promise<CommentOutputDto> {
        try {
            const createdComment = await this.commentService.createComment(comment);
            return plainToInstance(CommentOutputDto, createdComment);
        } catch (error) {
            throw error;
        }
    }

    @ApiOkResponse({ type: CommentOutputDto })
    @ApiNotFoundResponse({ description: COMMENT_NOT_FOUND })
    @ApiInternalServerErrorResponse()
    @ApiParam({ name: 'id', required: true })
    @Get(':id')
    async findCommentById(@Param('id', ParseIntPipe) id: number): Promise<CommentOutputDto> {
        try {
            const foundComment = await this.commentService.findCommentById(id);
            return plainToInstance(CommentOutputDto, foundComment);
        } catch (error) {
            throw new NotFoundException(COMMENT_NOT_FOUND);
        }
    }

    @ApiOkResponse({ type: CommentOutputDto })
    @ApiNotFoundResponse({ description: COMMENT_NOT_FOUND })
    @ApiInternalServerErrorResponse()
    @ApiParam({ name: 'id', required: true })
    @Put(':id')
    async updateComment(@Param('id', ParseIntPipe) id: number, @Body() comment: CommentInputDto): Promise<CommentOutputDto> {
        try {
            const updatedComment = await this.commentService.updateComment(id, comment);
            return plainToInstance(CommentOutputDto, updatedComment);
        } catch (error) {
            throw new NotFoundException(COMMENT_NOT_FOUND);
        }
    }

    @ApiOkResponse({ type: Boolean })
    @ApiNotFoundResponse({ description: COMMENT_NOT_FOUND })
    @ApiInternalServerErrorResponse()
    @ApiParam({ name: 'id', required: true })
    @Delete(':id')
    async deleteComment(@Param('id', ParseIntPipe) id: number): Promise<true> {
        try {
            await this.commentService.deleteComment(id);
            return true;
        } catch (error) {
            throw new NotFoundException(COMMENT_NOT_FOUND);
        }
    }
}
