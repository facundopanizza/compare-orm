import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { ProfileInputDto } from './dtos/input/profile.input.dto';
import { ProfileOutputDto } from './dtos/output/profile.output.dto';
import { ProfileService } from './profile.service';
import { Profile } from './entities/profile.entity';

const PROFILE_NOT_FOUND = 'Profile not found';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) { }

    @ApiCreatedResponse({ type: ProfileOutputDto })
    @ApiInternalServerErrorResponse()
    @HttpCode(HttpStatus.CREATED)
    @Post()
    async createProfile(@Body() profile: ProfileInputDto): Promise<ProfileOutputDto> {
        try {
            // Convert DTO to entity for service call
            const createdProfile = await this.profileService.createProfile(profile as Partial<Profile>);
            // Convert entity to DTO for response
            return plainToInstance(ProfileOutputDto, createdProfile);
        } catch (error) {
            throw error;
        }
    }

    @ApiOkResponse({ type: ProfileOutputDto })
    @ApiNotFoundResponse({ description: PROFILE_NOT_FOUND })
    @ApiInternalServerErrorResponse()
    @ApiParam({ name: 'id', required: true })
    @Get(':id')
    async findProfileById(@Param('id', ParseIntPipe) id: number): Promise<ProfileOutputDto> {
        try {
            const foundProfile = await this.profileService.findProfileById(id);
            return plainToInstance(ProfileOutputDto, foundProfile);
        } catch (error) {
            throw new NotFoundException(PROFILE_NOT_FOUND);
        }
    }

    @ApiOkResponse({ type: ProfileOutputDto })
    @ApiNotFoundResponse({ description: PROFILE_NOT_FOUND })
    @ApiInternalServerErrorResponse()
    @ApiParam({ name: 'id', required: true })
    @Put(':id')
    async updateProfile(@Param('id', ParseIntPipe) id: number, @Body() profile: ProfileInputDto): Promise<ProfileOutputDto> {
        try {
            // Convert DTO to entity for service call
            const updatedProfile = await this.profileService.updateProfile(id, profile as Partial<Profile>);
            // Convert entity to DTO for response
            return plainToInstance(ProfileOutputDto, updatedProfile);
        } catch (error) {
            throw new NotFoundException(PROFILE_NOT_FOUND);
        }
    }

    @ApiOkResponse({ type: Boolean })
    @ApiNotFoundResponse({ description: PROFILE_NOT_FOUND })
    @ApiInternalServerErrorResponse()
    @ApiParam({ name: 'id', required: true })
    @Delete(':id')
    async deleteProfile(@Param('id', ParseIntPipe) id: number): Promise<true> {
        try {
            await this.profileService.deleteProfile(id);
            return true;
        } catch (error) {
            throw new NotFoundException(PROFILE_NOT_FOUND);
        }
    }
}
