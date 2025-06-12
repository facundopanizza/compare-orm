import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { PostInputDto } from './dtos/input/post.input.dto';
import { PostOutputDto } from './dtos/output/post.output.dto';
import { PostService } from './post.service';

const POST_NOT_FOUND = 'Post not found';

@ApiTags('Post')
@Controller('post')
export class PostController {
    constructor(private postService: PostService) { }

    @ApiCreatedResponse({ type: PostOutputDto })
    @ApiInternalServerErrorResponse()
    @HttpCode(HttpStatus.CREATED)
    @Post()
    async createPost(@Body() post: PostInputDto): Promise<PostOutputDto> {
        try {
            const createdPost = await this.postService.createPost(post);
            return plainToInstance(PostOutputDto, createdPost);
        } catch (error) {
            throw error;
        }
    }

    @ApiOkResponse({ type: PostOutputDto })
    @ApiNotFoundResponse({ description: POST_NOT_FOUND })
    @ApiInternalServerErrorResponse()
    @ApiParam({ name: 'id', required: true })
    @Get(':id')
    async findPostById(@Param('id', ParseIntPipe) id: number): Promise<PostOutputDto> {
        try {
            const foundPost = await this.postService.findPostById(id);
            return plainToInstance(PostOutputDto, foundPost);
        } catch (error) {
            throw new NotFoundException(POST_NOT_FOUND);
        }
    }

    @ApiOkResponse({ type: PostOutputDto })
    @ApiNotFoundResponse({ description: POST_NOT_FOUND })
    @ApiInternalServerErrorResponse()
    @ApiParam({ name: 'id', required: true })
    @Put(':id')
    async updatePost(@Param('id', ParseIntPipe) id: number, @Body() post: PostInputDto): Promise<PostOutputDto> {
        try {
            const updatedPost = await this.postService.updatePost(id, post);
            return plainToInstance(PostOutputDto, updatedPost);
        } catch (error) {
            throw new NotFoundException(POST_NOT_FOUND);
        }
    }

    @ApiOkResponse({ type: Boolean })
    @ApiNotFoundResponse({ description: POST_NOT_FOUND })
    @ApiInternalServerErrorResponse()
    @ApiParam({ name: 'id', required: true })
    @Delete(':id')
    async deletePost(@Param('id', ParseIntPipe) id: number): Promise<true> {
        try {
            await this.postService.deletePost(id);
            return true;
        } catch (error) {
            throw new NotFoundException(POST_NOT_FOUND);
        }
    }
}
