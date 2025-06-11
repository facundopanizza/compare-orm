import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { UserInputDto } from './dtos/input/user.input.dto';
import { UserOutputDto } from './dtos/output/user.output.dto';
import { UserService } from './user.service';

const USER_NOT_FOUND = 'User not found';

@ApiTags()
@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @ApiCreatedResponse({ type: UserOutputDto })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    async createUser(@Body() user: UserInputDto): Promise<UserOutputDto> {
        const createdUser = await this.userService.createUser(user);

        return plainToInstance(UserOutputDto, createdUser);
    }

    @ApiOkResponse({ type: UserOutputDto })
    @ApiNotFoundResponse({ description: USER_NOT_FOUND })
    @ApiParam({ name: 'email', required: true })
    @Get('find-by-email/:email')
    async findUserByEmail(@Param('email') email: string): Promise<UserOutputDto> {
        const foundUser = await this.userService.findUserByEmail(email);

        if (!foundUser) {
            throw new NotFoundException(USER_NOT_FOUND);
        }

        return plainToInstance(UserOutputDto, foundUser);
    }

    @ApiOkResponse({ type: UserOutputDto })
    @ApiNotFoundResponse({ description: USER_NOT_FOUND })
    @ApiParam({ name: 'id', required: true })
    @Get(':id')
    async findUserById(@Param('id') id: number): Promise<UserOutputDto> {
        const foundUser = await this.userService.findUserById(id);

        if (!foundUser) {
            throw new NotFoundException(USER_NOT_FOUND);
        }

        return plainToInstance(UserOutputDto, foundUser);
    }

    @ApiOkResponse({ type: UserOutputDto })
    @ApiNotFoundResponse({ description: USER_NOT_FOUND })
    @ApiParam({ name: 'id', required: true })
    @Put(':id')
    async updateUser(@Param('id') id: number, @Body() user: UserInputDto): Promise<UserOutputDto> {
        const updatedUser = await this.userService.updateUser(id, user);

        if (!updatedUser) {
            throw new NotFoundException(USER_NOT_FOUND);
        }

        return plainToInstance(UserOutputDto, updatedUser);
    }

    @ApiOkResponse({ type: UserOutputDto })
    @ApiNotFoundResponse({ description: USER_NOT_FOUND })
    @ApiParam({ name: 'id', required: true })
    @Delete(':id')
    async deleteUser(@Param('id') id: number): Promise<true | null> {
        const deletedUser = await this.userService.deleteUser(id);

        if (!deletedUser) {
            throw new NotFoundException(USER_NOT_FOUND);
        }

        return deletedUser;
    }
}