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
import { UserInputDto } from './dtos/input/user.input.dto';
import { UserOutputDto } from './dtos/output/user.output.dto';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { UserService } from './user.service';

const USER_NOT_FOUND = 'User not found';

@ApiTags()
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiCreatedResponse({ type: UserOutputDto })
  @ApiInternalServerErrorResponse()
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createUser(@Body() user: UserInputDto): Promise<UserOutputDto> {
    try {
      const createdUser = await this.userService.createUser(user);

      return plainToInstance(UserOutputDto, createdUser);
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new NotFoundException(USER_NOT_FOUND);
      }

      throw error;
    }
  }

  @ApiOkResponse({ type: UserOutputDto })
  @ApiNotFoundResponse({ description: USER_NOT_FOUND })
  @ApiInternalServerErrorResponse()
  @ApiParam({ name: 'email', required: true })
  @Get('find-by-email/:email')
  async findUserByEmail(@Param('email') email: string): Promise<UserOutputDto> {
    try {
      const foundUser = await this.userService.findUserByEmail(email);

      return plainToInstance(UserOutputDto, foundUser);
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new NotFoundException(USER_NOT_FOUND);
      }

      throw error;
    }
  }

  @ApiOkResponse({ type: UserOutputDto })
  @ApiNotFoundResponse({ description: USER_NOT_FOUND })
  @ApiInternalServerErrorResponse()
  @ApiParam({ name: 'id', required: true })
  @Get(':id')
  async findUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserOutputDto> {
    try {
      const foundUser = await this.userService.findUserById(id);

      return plainToInstance(UserOutputDto, foundUser);
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new NotFoundException(USER_NOT_FOUND);
      }

      throw error;
    }
  }

  @ApiOkResponse({ type: UserOutputDto })
  @ApiNotFoundResponse({ description: USER_NOT_FOUND })
  @ApiInternalServerErrorResponse()
  @ApiParam({ name: 'id', required: true })
  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UserInputDto,
  ): Promise<UserOutputDto> {
    try {
      const updatedUser = await this.userService.updateUser(id, user);

      return plainToInstance(UserOutputDto, updatedUser);
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new NotFoundException(USER_NOT_FOUND);
      }

      throw error;
    }
  }

  @ApiOkResponse({ type: UserOutputDto })
  @ApiNotFoundResponse({ description: USER_NOT_FOUND })
  @ApiInternalServerErrorResponse()
  @ApiParam({ name: 'id', required: true })
  @Delete(':id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<true | null> {
    try {
      const deletedUser = await this.userService.deleteUser(id);

      if (!deletedUser) {
        throw new NotFoundException(USER_NOT_FOUND);
      }

      return deletedUser;
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new NotFoundException(USER_NOT_FOUND);
      }

      throw error;
    }
  }
}
